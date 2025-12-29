// Catalogue Loader - Fetches data from Firebase and renders catalogue
// Note: DEFAULT_MATERIAL is declared in firebase-config.js
// We'll use that value or fallback to this constant if not available
const getDefaultMaterial = () => {
    return typeof DEFAULT_MATERIAL !== 'undefined' ? DEFAULT_MATERIAL : "B-Flute Corrugated";
};

// Category mapping (map your stock categories to website categories)
const CATEGORY_MAPPING = {
    'pizza': ['pizza', 'pz', 'pizza box'],
    'big-mailer-brown': ['big mailer brown', 'big mb brown'],
    'big-mailer-white': ['big mailer white', 'big mb white'],
    'small-mailer-brown': ['small mailer brown', 'nm brown'],
    'small-mailer-white': ['small mailer white', 'nm white'],
    'big-mailer': ['big mailer', 'big mb', 'mailer box mb'],
    'small-mailer': ['small mailer', 'nm', 'mailer box nm'],
    'mailer': ['mailer', 'mb', 'mailer box'], // Fallback for general mailer
    'rsc': ['rsc', 'regular slotted', 'rsc box'],
    'document': ['document', 'archive', 'document box']
};

// Category display info
const CATEGORY_INFO = {
    'pizza': {
        name: 'Pizza Box',
        description: 'Heat-resistant corrugated boxes',
        image: 'PIZZA BOX.jpg'
    },
    'big-mailer-brown': {
        name: 'Big Mailer Box - Brown',
        description: 'Secure, self-locking boxes designed for shipping larger items',
        image: 'MAILER BOX.jpg'
    },
    'big-mailer-white': {
        name: 'Big Mailer Box - White',
        description: 'Secure, self-locking boxes designed for shipping larger items',
        image: 'MAILER BOX.jpg'
    },
    'small-mailer-brown': {
        name: 'Small Mailer Box - Brown',
        description: 'Compact, self-locking boxes perfect for shipping smaller items',
        image: 'MAILER BOX.jpg'
    },
    'small-mailer-white': {
        name: 'Small Mailer Box - White',
        description: 'Compact, self-locking boxes perfect for shipping smaller items',
        image: 'MAILER BOX.jpg'
    },
    'big-mailer': {
        name: 'Big Mailer Box',
        description: 'Secure, self-locking boxes designed for shipping larger items',
        image: 'MAILER BOX.jpg'
    },
    'small-mailer': {
        name: 'Small Mailer Box',
        description: 'Compact, self-locking boxes perfect for shipping smaller items',
        image: 'MAILER BOX.jpg'
    },
    'mailer': {
        name: 'Mailer Box',
        description: 'E-commerce shipping boxes',
        image: 'MAILER BOX.jpg'
    },
    'rsc': {
        name: 'RSC Box',
        description: 'Regular Slotted Container',
        image: 'RSC BOX.jpg'
    },
    'document': {
        name: 'Document Box',
        description: 'Archive storage boxes',
        image: 'DOCUMENT BOX.jpg'
    }
};

// Initialize Firebase (will be set from firebase-config.js)
let db = null;
let firebaseInitialized = false;

// Initialize Firebase when config is ready
function initializeFirebase(config) {
    if (typeof firebase !== 'undefined') {
        try {
            // Check if already initialized
            if (firebase.apps.length === 0) {
                firebase.initializeApp(config);
            }
            
            // Try to initialize Firestore (if available)
            try {
                db = firebase.firestore();
                console.log('✅ Firestore initialized');
            } catch (e) {
                console.log('ℹ️ Firestore not available, using Realtime Database');
            }
            
            firebaseInitialized = true;
            console.log('✅ Firebase initialized - Ready to fetch products');
            
            // Load catalogue after a short delay to ensure everything is ready
            setTimeout(() => {
                loadCatalogueFromFirebase();
            }, 500);
        } catch (error) {
            console.error('❌ Firebase initialization error:', error);
        }
    } else {
        console.warn('⚠️ Firebase SDK not loaded');
    }
}

// Fetch products from Firestore
async function fetchProductsFromFirestore() {
    if (!firebaseInitialized) {
        console.warn('Firebase not initialized. Using static data.');
        return null;
    }

    // Check if Firestore is available
    if (!db || typeof firebase.firestore === 'undefined') {
        console.log('ℹ️ Firestore not available, trying Realtime Database...');
        return null;
    }

    try {
        // Fetch products where status is 'ready' or 'available'
        const productsSnapshot = await db.collection('products')
            .where('status', 'in', ['ready', 'available', 'in stock'])
            .get();
        
        const products = [];
        productsSnapshot.forEach(doc => {
            const data = doc.data();
            products.push({
                id: doc.id,
                name: data.name || data.productName || '',
                category: data.category || data.type || '',
                size: data.size || data.sizeName || '',
                dimensions: formatDimensions(data.dimensions || data.size || ''),
                material: data.material || getDefaultMaterial(), // Default to B-Flute
                stock: data.stock || data.quantity || data.availableStock || 0,
                image: data.image || data.imageUrl || '',
                badge: data.badge || data.tag || '',
                highlight: data.highlight || data.featured || false,
                sku: data.sku || data.productCode || '',
                ...data
            });
        });
        
        if (products.length > 0) {
            console.log(`✅ Fetched ${products.length} products from Firestore`);
        }
        return products;
    } catch (error) {
        console.error('Error fetching from Firestore:', error);
        return null;
    }
}

// Alternative: Fetch from Realtime Database (Primary method for your setup)
async function fetchProductsFromRealtimeDB() {
    if (!firebaseInitialized) {
        console.warn('Firebase not initialized. Using static data.');
        return null;
    }

    try {
        // Try different possible paths in your database
        const possiblePaths = ['products', 'items', 'stock', 'inventory'];
        let products = [];
        
        for (const path of possiblePaths) {
            try {
                const snapshot = await firebase.database().ref(path).once('value');
                const data = snapshot.val();
                
                if (data) {
                    Object.keys(data).forEach(key => {
                        const item = data[key];
                        // Only include ready stock - check multiple status fields
                        const isReady = item.status === 'ready' || 
                                      item.status === 'available' || 
                                      item.status === 'in stock' ||
                                      item.available === true || 
                                      item.inStock === true ||
                                      item.ready === true ||
                                      // If no status field, include all items
                                      (!item.status && !item.available && !item.inStock);
                        
                        if (isReady) {
                            products.push({
                                id: key,
                                name: item.name || item.productName || item.product_name || '',
                                category: item.category || item.type || item.product_type || '',
                                size: item.size || item.sizeName || item.size_name || '',
                                dimensions: formatDimensions(item.dimensions || item.size || item.dimension || ''),
                                material: item.material || getDefaultMaterial(), // Default to B-Flute
                                stock: item.stock || item.quantity || item.availableStock || item.stock_quantity || 0,
                                image: item.image || item.imageUrl || item.image_url || '',
                                badge: item.badge || item.tag || item.label || '',
                                highlight: item.highlight || item.featured || item.popular || false,
                                sku: item.sku || item.productCode || item.product_code || '',
                                ...item
                            });
                        }
                    });
                    
                    if (products.length > 0) {
                        console.log(`✅ Fetched ${products.length} products from Realtime Database (path: ${path})`);
                        break; // Found products, stop trying other paths
                    }
                }
            } catch (pathError) {
                // Path doesn't exist, try next one
                continue;
            }
        }
        
        return products.length > 0 ? products : null;
    } catch (error) {
        console.error('Error fetching from Realtime DB:', error);
        return null;
    }
}

// Format dimensions string
function formatDimensions(dimensions) {
    if (typeof dimensions === 'string') {
        // If already formatted, return as is
        if (dimensions.includes('cm') || dimensions.includes('x')) {
            return dimensions;
        }
        // If it's a number or array, format it
        const parts = dimensions.split(/[x×]/).map(p => p.trim());
        if (parts.length >= 2) {
            return parts.map(p => p.includes('cm') ? p : p + 'cm').join(' x ');
        }
    }
    return dimensions || '';
}

// Determine category from product data
function determineCategory(product) {
    const name = (product.name || '').toLowerCase();
    const category = (product.category || '').toLowerCase();
    const sku = (product.sku || product.id || '').toUpperCase();
    const searchText = name + ' ' + category;
    
    // Check if it's a mailer box first and determine big/small and color based on SKU
    if (sku.startsWith('MB')) {
        // Check if it's a white variant (ends with W)
        if (sku.endsWith('W') || sku.includes('W')) {
            return 'big-mailer-white';
        }
        return 'big-mailer-brown';
    }
    // All NM codes are Small Mailer Box - check if white
    if (sku.startsWith('NM')) {
        // Check if it's a white variant (ends with W)
        if (sku.endsWith('W') || sku.includes('W')) {
            return 'small-mailer-white';
        }
        return 'small-mailer-brown';
    }
    
    // Check other categories
    for (const [key, keywords] of Object.entries(CATEGORY_MAPPING)) {
        // Skip mailer categories since we handled them above
        if (key.includes('mailer')) continue;
        
        const match = keywords.some(keyword => 
            searchText.includes(keyword.toLowerCase())
        );
        if (match) return key;
    }
    
    // Fallback to general mailer if no specific match
    const isMailer = searchText.includes('mailer') || searchText.includes('mb');
    if (isMailer) {
        // Try to determine big or small from SKU if available
        if (sku && sku.startsWith('MB')) {
            return sku.endsWith('W') ? 'big-mailer-white' : 'big-mailer-brown';
        }
        if (sku && sku.startsWith('NM')) {
            return sku.endsWith('W') ? 'small-mailer-white' : 'small-mailer-brown';
        }
        return 'mailer'; // Fallback to general mailer
    }
    
    return null;
}

// Group products by category
function groupProductsByCategory(products) {
    const grouped = {
        pizza: [],
        'big-mailer-brown': [],
        'big-mailer-white': [],
        'small-mailer-brown': [],
        'small-mailer-white': [],
        'big-mailer': [], // Fallback
        'small-mailer': [], // Fallback
        mailer: [], // Fallback
        rsc: [],
        document: []
    };
    
    products.forEach(product => {
        const category = determineCategory(product);
        if (category && grouped[category]) {
            grouped[category].push(product);
        }
    });
    
    return grouped;
}

// Render catalogue from Firebase data
async function loadCatalogueFromFirebase() {
    const catalogueGrid = document.getElementById('catalogueGrid');
    if (!catalogueGrid) {
        console.warn('Catalogue grid not found');
        return;
    }

    // Show loading state
    catalogueGrid.innerHTML = '<div class="loading-state"><i class="fas fa-spinner fa-spin"></i> Loading products...</div>';

    // Try Firestore first, then Realtime DB
    let products = await fetchProductsFromFirestore();
    if (!products || products.length === 0) {
        products = await fetchProductsFromRealtimeDB();
    }

    // If no products from Firebase, keep static HTML
    if (!products || products.length === 0) {
        console.log('No products from Firebase. Using static catalogue.');
        return;
    }

    // Group products by category
    const grouped = groupProductsByCategory(products);
    
    // Render catalogue
    let html = '';
    
    for (const [categoryKey, categoryProducts] of Object.entries(grouped)) {
        if (categoryProducts.length === 0) continue;
        
        const categoryInfo = CATEGORY_INFO[categoryKey];
        if (!categoryInfo) continue;

        html += renderCategory(categoryKey, categoryInfo, categoryProducts);
    }

    // Replace catalogue content
    catalogueGrid.innerHTML = html;
    
    // Re-initialize category toggles
    initializeCategoryToggles();
    
    console.log(`✅ Loaded ${products.length} products from Firebase`);
}

// Render a category
function renderCategory(categoryKey, categoryInfo, products) {
    const count = products.length;
    const sizeText = count === 1 ? 'size' : 'sizes';
    
    let html = `
        <div class="catalogue-category" data-category="${categoryKey}">
            <div class="category-main-card" onclick="toggleCategory(this)">
                <div class="category-image">
                    <img src="${categoryInfo.image}" alt="${categoryInfo.name}" class="category-product-image" loading="lazy" decoding="async">
                </div>
                <div class="category-info">
                    <div class="category-text">
                        <h3>${categoryInfo.name}</h3>
                        <p>${categoryInfo.description} - Available in ${count} ${sizeText}</p>
                    </div>
                    <div class="expand-icon">
                        <span>+</span>
                    </div>
                </div>
            </div>
            
            <div class="category-variants">
                <div class="variants-table-wrapper">
                    <table class="variants-table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Description</th>
                                <th>Size Dimension</th>
                                <th>Color</th>
                            </tr>
                        </thead>
                        <tbody>
    `;

    // Sort products by name/size
    products.sort((a, b) => {
        const nameA = (a.name || a.size || '').toLowerCase();
        const nameB = (b.name || b.size || '').toLowerCase();
        return nameA.localeCompare(nameB);
    });

    products.forEach((product, index) => {
        const code = product.sku || product.id || 'N/A';
        const sizeName = product.size || product.name || 'N/A';
        
        // Determine description and color based on category
        let description = sizeName;
        let color = 'Brown';
        
        if (categoryKey === 'big-mailer-brown') {
            description = 'Big Mailer Box';
            color = 'Brown';
        } else if (categoryKey === 'big-mailer-white') {
            description = 'Big Mailer Box';
            color = 'White';
        } else if (categoryKey === 'small-mailer-brown') {
            description = 'Small Mailer Box';
            color = 'Brown';
        } else if (categoryKey === 'small-mailer-white') {
            description = 'Small Mailer Box';
            color = 'White';
        } else if (categoryKey === 'big-mailer') {
            // Fallback
            if (code.startsWith('MB') && code.includes('W')) {
                description = 'Big Mailer Box';
                color = 'White';
            } else {
                description = 'Big Mailer Box';
                color = 'Brown';
            }
        } else if (categoryKey === 'small-mailer') {
            // Fallback
            if (code.startsWith('NM') && code.includes('W')) {
                description = 'Small Mailer Box';
                color = 'White';
            } else {
                description = 'Small Mailer Box';
                color = 'Brown';
            }
        }
        
        const dimensions = product.dimensions || 'N/A';
        const badge = product.badge ? `<span class="table-badge">${product.badge}</span>` : '';
        const highlightClass = product.highlight ? 'highlighted-row' : '';
        const productName = `${categoryInfo.name} - ${sizeName}`;
        
        html += `
            <tr class="${highlightClass}">
                <td class="code-col"><strong>${code}</strong></td>
                <td class="desc-col">${description} ${badge}</td>
                <td class="size-col">${dimensions}</td>
                <td class="color-col">${color}</td>
            </tr>
        `;
    });

    html += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    return html;
}

// Initialize category toggle functionality
function initializeCategoryToggles() {
    // This function is already defined in script.js, but we ensure it works
    if (typeof toggleCategory === 'function') {
        // Function already exists, no need to redefine
        return;
    }
    
    // If not defined, define it here
    window.toggleCategory = function(element) {
        const category = element.closest('.catalogue-category');
        const variants = category.querySelector('.category-variants');
        const expandIcon = element.querySelector('.expand-icon span');

        // Close all other open categories
        document.querySelectorAll('.catalogue-category.active').forEach(activeCategory => {
            if (activeCategory !== category) {
                activeCategory.classList.remove('active');
                activeCategory.querySelector('.category-variants').style.maxHeight = null;
                activeCategory.querySelector('.expand-icon span').textContent = '+';
            }
        });

        // Toggle current category
        category.classList.toggle('active');
        if (category.classList.contains('active')) {
            variants.style.maxHeight = variants.scrollHeight + "px";
            expandIcon.textContent = '×';
        } else {
            variants.style.maxHeight = null;
            expandIcon.textContent = '+';
        }
    };
}

// Auto-load when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Wait a bit for Firebase config to load
        setTimeout(() => {
            if (firebaseInitialized) {
                loadCatalogueFromFirebase();
            }
        }, 1000);
    });
} else {
    // DOM already loaded
    setTimeout(() => {
        if (firebaseInitialized) {
            loadCatalogueFromFirebase();
        }
    }, 1000);
}

