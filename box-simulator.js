// 3D Box Simulator using Three.js

let scene, camera, renderer, box, controls;
let isWireframe = false;
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationX = 0;
let rotationY = 0;
let zoom = 5;

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

