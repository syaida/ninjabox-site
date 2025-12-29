// 3D Box Simulator using Three.js

let scene, camera, renderer, box, controls;
let isWireframe = false;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationX = 0;
let rotationY = 0;
let zoom = 5;
let gridHelper, referenceObject, currentReferenceType = 'none';
let showGrid = true;
let showReference = false;

// Initialize 3D Box Simulator
function initBoxSimulator() {
    const container = document.getElementById('box3DContainer');
    if (!container) return;

    // Hide loading message
    const loadingMsg = document.getElementById('simulatorLoading');
    if (loadingMsg) {
        loadingMsg.style.display = 'none';
    }

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    // Camera setup
    const width = container.clientWidth;
    const height = container.clientHeight || 550;
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(5, 10, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // Add reference grid
    addReferenceGrid();

    // Reference object will be created when user selects one

    // Create initial box
    updateBox();

    // Add event listeners
    setupEventListeners();

    // Start animation loop
    animate();

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

// Create or update box geometry
function updateBox() {
    // Remove existing box if any
    if (box) {
        scene.remove(box);
        box.geometry.dispose();
        box.material.dispose();
    }

    // Get dimensions from inputs
    const length = parseFloat(document.getElementById('boxLength').value) || 30;
    const width = parseFloat(document.getElementById('boxWidth').value) || 20;
    const height = parseFloat(document.getElementById('boxHeight').value) || 15;

    // Create box geometry (scale down for better visualization)
    const scale = 0.1; // Convert cm to units
    const geometry = new THREE.BoxGeometry(
        length * scale,
        height * scale,
        width * scale
    );

    // Create material
    const material = new THREE.MeshStandardMaterial({
        color: 0xff6b35,
        metalness: 0.1,
        roughness: 0.7,
        wireframe: isWireframe
    });

    // Create mesh
    box = new THREE.Mesh(geometry, material);
    scene.add(box);

    // Add edges for better visualization
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 2 });
    const edgesMesh = new THREE.LineSegments(edges, lineMaterial);
    box.add(edgesMesh);

    // Update info display
    updateBoxInfo(length, width, height);

    // Update size comparison
    updateSizeComparison(length, width, height);

    // Update reference grid size
    updateReferenceGrid(length, width, height);

    // Update reference object position
    updateReferenceObject(length, width, height);

    // Update scale indicator
    updateScaleIndicator(length, width, height);

    // Adjust camera to fit box
    const maxDim = Math.max(length, width, height) * scale;
    camera.position.set(maxDim * 2, maxDim * 2, maxDim * 2);
    camera.lookAt(0, 0, 0);
}

// Update box information display
function updateBoxInfo(length, width, height) {
    const volume = length * width * height;
    const surfaceArea = 2 * (length * width + length * height + width * height);

    document.getElementById('boxVolume').textContent = 
        volume.toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' cm³';
    document.getElementById('boxSurfaceArea').textContent = 
        surfaceArea.toLocaleString('en-US', { maximumFractionDigits: 0 }) + ' cm²';
}

// Setup event listeners
function setupEventListeners() {
    // Dimension input listeners
    ['boxLength', 'boxWidth', 'boxHeight'].forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', debounce(updateBox, 300));
            input.addEventListener('change', updateBox);
        }
    });

    // Mouse controls for rotation
    const container = document.getElementById('box3DContainer');
    if (container) {
        container.addEventListener('mousedown', onMouseDown);
        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseup', onMouseUp);
        container.addEventListener('wheel', onMouseWheel, { passive: false });
    }
}

// Mouse event handlers
function onMouseDown(event) {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseMove(event) {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    rotationY += deltaX * 0.01;
    rotationX += deltaY * 0.01;

    // Limit vertical rotation
    rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX));

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
}

function onMouseUp() {
    isDragging = false;
}

function onMouseWheel(event) {
    event.preventDefault();
    const delta = event.deltaY * 0.01;
    zoom += delta;
    zoom = Math.max(2, Math.min(10, zoom));

    const maxDim = Math.max(
        parseFloat(document.getElementById('boxLength').value) || 30,
        parseFloat(document.getElementById('boxWidth').value) || 20,
        parseFloat(document.getElementById('boxHeight').value) || 15
    ) * 0.1;

    const distance = maxDim * zoom;
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    camera.position.set(
        direction.x * distance,
        direction.y * distance,
        direction.z * distance
    );
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    if (box) {
        // Apply rotation
        box.rotation.y = rotationY;
        box.rotation.x = rotationX;
    }

    renderer.render(scene, camera);
}

// Window resize handler
function onWindowResize() {
    const container = document.getElementById('box3DContainer');
    if (!container || !camera || !renderer) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 550;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Reset box dimensions
function resetBoxDimensions() {
    document.getElementById('boxLength').value = 30;
    document.getElementById('boxWidth').value = 20;
    document.getElementById('boxHeight').value = 15;
    updateBox();
    resetCamera();
}

// Reset camera position
function resetCamera() {
    rotationX = 0.5;
    rotationY = 0.5;
    zoom = 5;
    
    const maxDim = Math.max(
        parseFloat(document.getElementById('boxLength').value) || 30,
        parseFloat(document.getElementById('boxWidth').value) || 20,
        parseFloat(document.getElementById('boxHeight').value) || 15
    ) * 0.1;

    camera.position.set(maxDim * 2, maxDim * 2, maxDim * 2);
    camera.lookAt(0, 0, 0);
}

// Toggle wireframe mode
function toggleWireframe() {
    isWireframe = !isWireframe;
    if (box) {
        box.material.wireframe = isWireframe;
    }
}

// Request quote from simulator
function requestQuoteFromSimulator() {
    const length = document.getElementById('boxLength').value;
    const width = document.getElementById('boxWidth').value;
    const height = document.getElementById('boxHeight').value;

    // Scroll to contact form and pre-fill dimensions
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-fill message with dimensions
        setTimeout(() => {
            const messageField = document.getElementById('message');
            if (messageField) {
                messageField.value = `I'm interested in a custom box with the following dimensions:\nLength: ${length} cm\nWidth: ${width} cm\nHeight: ${height} cm\n\nPlease provide a quote for this size.`;
            }
        }, 500);
    }
}

// Add reference grid
function addReferenceGrid() {
    if (gridHelper) {
        scene.remove(gridHelper);
    }
    gridHelper = new THREE.GridHelper(10, 10, 0xcccccc, 0xeeeeee);
    gridHelper.position.y = -0.5;
    scene.add(gridHelper);
}

// Update reference grid size
function updateReferenceGrid(length, width, height) {
    if (!gridHelper) return;
    
    const maxDim = Math.max(length, width, height) * 0.1;
    const gridSize = Math.max(10, maxDim * 2);
    const divisions = Math.max(10, Math.floor(gridSize / 2));
    
    scene.remove(gridHelper);
    gridHelper = new THREE.GridHelper(gridSize, divisions, 0xcccccc, 0xeeeeee);
    gridHelper.position.y = -(height * 0.1) / 2;
    if (showGrid) {
        scene.add(gridHelper);
    }
}

// Add reference object (person silhouette)
function addReferenceObject() {
    if (referenceObject) {
        scene.remove(referenceObject);
    }
    
    // Create a simple person silhouette (cylinder for body, sphere for head)
    const group = new THREE.Group();
    
    // Body (cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 8);
    const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x666666, transparent: true, opacity: 0.6 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.25;
    group.add(body);
    
    // Head (sphere)
    const headGeometry = new THREE.SphereGeometry(0.12, 8, 8);
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0x666666, transparent: true, opacity: 0.6 });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.5 + 0.12;
    group.add(head);
    
    // Total height ~1.7 units (represents ~170cm person)
    referenceObject = group;
    referenceObject.scale.set(0.1, 0.1, 0.1); // Scale to represent 170cm person
    referenceObject.position.set(3, 0, 0);
    if (showReference) {
        scene.add(referenceObject);
    }
}

// Update reference object position
function updateReferenceObject(length, width, height) {
    updateReferenceObjectPosition();
}

// Update reference object position based on box size
function updateReferenceObjectPosition() {
    if (!referenceObject || currentReferenceType === 'none') return;
    
    const length = parseFloat(document.getElementById('boxLength').value) || 30;
    const width = parseFloat(document.getElementById('boxWidth').value) || 20;
    const height = parseFloat(document.getElementById('boxHeight').value) || 15;
    
    const maxDim = Math.max(length, width, height) * 0.1;
    const offset = maxDim * 1.5;
    
    // Position next to the box
    referenceObject.position.set(offset, -(height * 0.1) / 2, 0);
    
    // Show/hide based on toggle
    if (showReference && currentReferenceType !== 'none') {
        if (!scene.children.includes(referenceObject)) {
            scene.add(referenceObject);
        }
    } else {
        if (scene.children.includes(referenceObject)) {
            scene.remove(referenceObject);
        }
    }
}

// Set reference object type
function setReferenceObject(type, event) {
    // Update button states
    document.querySelectorAll('.ref-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (type !== 'none' && event && event.target) {
        event.target.classList.add('active');
    }
    
    createReferenceObject(type);
    updateReferenceObjectPosition();
}

// Toggle reference grid
function toggleReferenceGrid() {
    showGrid = !showGrid;
    const btn = document.getElementById('gridToggleBtn');
    if (btn) {
        btn.style.background = showGrid ? 'var(--secondary-color)' : 'rgba(255, 255, 255, 0.9)';
        btn.style.color = showGrid ? 'white' : 'var(--secondary-color)';
    }
    
    if (gridHelper) {
        if (showGrid) {
            if (!scene.children.includes(gridHelper)) {
                scene.add(gridHelper);
            }
        } else {
            if (scene.children.includes(gridHelper)) {
                scene.remove(gridHelper);
            }
        }
    }
}

// Toggle reference object (kept for backward compatibility)
function toggleReferenceObject() {
    if (currentReferenceType === 'none') {
        setReferenceObject('marker'); // Default to marker if none selected
    } else {
        setReferenceObject('none');
    }
}

// Update size comparison text
function updateSizeComparison(length, width, height) {
    const comparisonText = document.getElementById('comparisonText');
    if (!comparisonText) return;
    
    const volume = length * width * height;
    const maxDim = Math.max(length, width, height);
    const avgDim = (length + width + height) / 3;
    
    let comparison = '';
    
    // Pizza box comparison
    if (length >= 25 && length <= 40 && width >= 20 && width <= 35 && height >= 3 && height <= 8) {
        comparison = 'Similar to a standard pizza box';
    }
    // Shoebox comparison
    else if (length >= 25 && length <= 35 && width >= 15 && width <= 25 && height >= 8 && height <= 15) {
        comparison = 'Similar to a standard shoebox';
    }
    // Document box comparison
    else if (length >= 20 && length <= 40 && width >= 15 && width <= 30 && height >= 5 && height <= 15) {
        comparison = 'Similar to a document storage box';
    }
    // Mailer box comparison
    else if (length >= 15 && length <= 30 && width >= 10 && width <= 25 && height >= 3 && height <= 10) {
        comparison = 'Similar to a standard mailer box';
    }
    // Large box
    else if (maxDim > 50) {
        comparison = 'Large box - suitable for furniture or large items';
    }
    // Small box
    else if (maxDim < 15) {
        comparison = 'Small box - suitable for jewelry or small items';
    }
    // Medium box
    else {
        comparison = 'Medium-sized box - versatile for various products';
    }
    
    // Add volume context
    if (volume < 1000) {
        comparison += ' (very compact)';
    } else if (volume < 5000) {
        comparison += ' (compact)';
    } else if (volume < 15000) {
        comparison += ' (medium)';
    } else if (volume < 50000) {
        comparison += ' (large)';
    } else {
        comparison += ' (very large)';
    }
    
    comparisonText.textContent = comparison;
}

// Update scale indicator
function updateScaleIndicator(length, width, height) {
    const scaleRuler = document.getElementById('scaleRuler');
    if (!scaleRuler) return;
    
    const maxDim = Math.max(length, width, height);
    const scale = Math.min(100, maxDim); // Max 100cm shown on ruler
    
    // Create visual ruler marks
    let rulerHTML = '';
    for (let i = 0; i <= scale; i += 10) {
        const position = (i / scale) * 100;
        rulerHTML += `<div class="ruler-mark" style="left: ${position}%">
            <div class="ruler-line"></div>
            <span class="ruler-label">${i}cm</span>
        </div>`;
    }
    scaleRuler.innerHTML = rulerHTML;
}

// Set preset size
function setPresetSize(type) {
    let length, width, height;
    
    switch(type) {
        case 'pizza':
            length = 32;
            width = 32;
            height = 4;
            break;
        case 'shoebox':
            length = 30;
            width = 20;
            height = 12;
            break;
        case 'document':
            length = 35;
            width = 25;
            height = 10;
            break;
        case 'mailer':
            length = 25;
            width = 18;
            height = 5;
            break;
        default:
            return;
    }
    
    document.getElementById('boxLength').value = length;
    document.getElementById('boxWidth').value = width;
    document.getElementById('boxHeight').value = height;
    updateBox();
}

// Debounce function for input events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit for Three.js to load
        setTimeout(initBoxSimulator, 500);
    });
} else {
    setTimeout(initBoxSimulator, 500);
}

