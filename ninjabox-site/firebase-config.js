// Firebase Configuration for ninjabox-site project
// ⚠️ IMPORTANT: Update this config with your ninjabox-site project config
// Get it from: https://console.firebase.google.com/project/ninjabox-site/settings/general
// Scroll to "Your apps" section and copy the firebaseConfig

const firebaseConfig = {
    // ⬇️ REPLACE THESE VALUES WITH YOUR CONFIG FROM FIREBASE CONSOLE ⬇️
    // Go to: https://console.firebase.google.com/project/ninjabox-site/settings/general
    apiKey: "REPLACE_WITH_YOUR_API_KEY",                    // Get from Firebase Console
    authDomain: "ninjabox-site.firebaseapp.com",            // Should be: ninjabox-site.firebaseapp.com
    databaseURL: "",                                         // Optional for Firestore, can leave empty
    projectId: "ninjabox-site",                             // Should be: ninjabox-site
    storageBucket: "ninjabox-site.appspot.com",             // Should be: ninjabox-site.appspot.com
    messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",       // Get from Firebase Console
    appId: "REPLACE_WITH_YOUR_APP_ID",                      // Get from Firebase Console
    measurementId: ""                                       // Optional, can leave empty
};

// Initialize Firebase when this script loads
// Using compat SDK for compatibility with older Firebase syntax
if (typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        console.log('✅ Firebase initialized successfully');
        
        // Initialize the catalogue loader
        if (typeof initializeFirebase === 'function') {
            initializeFirebase(firebaseConfig);
        }
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
    }
} else {
    console.warn('⚠️ Firebase SDK not loaded yet. Waiting...');
    // Retry after a short delay
    setTimeout(() => {
        if (typeof firebase !== 'undefined') {
            firebase.initializeApp(firebaseConfig);
            if (typeof initializeFirebase === 'function') {
                initializeFirebase(firebaseConfig);
            }
        }
    }, 1000);
}

// Default material for ready stock
const DEFAULT_MATERIAL = "B-Flute Corrugated";

// Note: CATEGORY_MAPPING is declared in catalogue-loader.js to avoid duplicate declaration
// If you need to access it, use the one from catalogue-loader.js

// Fetch products from Firebase
async function fetchProductsFromFirebase() {
    try {
        // Example: Fetch from Firestore
        // Adjust the collection name and fields based on your database structure
        const productsSnapshot = await db.collection('products')
            .where('status', '==', 'ready') // Only fetch ready stock
            .get();
        
        const products = [];
        productsSnapshot.forEach(doc => {
            const data = doc.data();
            products.push({
                id: doc.id,
                name: data.name || '',
                category: data.category || '',
                size: data.size || '',
                dimensions: data.dimensions || '',
                material: data.material || DEFAULT_MATERIAL, // Default to B-Flute
                stock: data.stock || 0,
                image: data.image || '',
                badge: data.badge || '',
                highlight: data.highlight || false,
                ...data
            });
        });
        
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Alternative: Fetch from Realtime Database
async function fetchProductsFromRealtimeDB() {
    try {
        const snapshot = await firebase.database().ref('products').once('value');
        const data = snapshot.val();
        const products = [];
        
        if (data) {
            Object.keys(data).forEach(key => {
                const item = data[key];
                // Only include ready stock
                if (item.status === 'ready' || item.available === true) {
                    products.push({
                        id: key,
                        name: item.name || '',
                        category: item.category || '',
                        size: item.size || '',
                        dimensions: item.dimensions || '',
                        material: item.material || DEFAULT_MATERIAL, // Default to B-Flute
                        stock: item.stock || item.quantity || 0,
                        image: item.image || '',
                        badge: item.badge || '',
                        highlight: item.highlight || false,
                        ...item
                    });
                }
            });
        }
        
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Group products by category
function groupProductsByCategory(products) {
    const grouped = {
        pizza: [],
        mailer: [],
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

// Determine category from product data
// Note: Uses CATEGORY_MAPPING from catalogue-loader.js if available
function determineCategory(product) {
    // Check if CATEGORY_MAPPING is available (from catalogue-loader.js)
    if (typeof CATEGORY_MAPPING === 'undefined') {
        return null;
    }
    
    const name = (product.name || '').toLowerCase();
    const category = (product.category || '').toLowerCase();
    
    for (const [key, keywords] of Object.entries(CATEGORY_MAPPING)) {
        const match = keywords.some(keyword => 
            name.includes(keyword.toLowerCase()) || 
            category.includes(keyword.toLowerCase())
        );
        if (match) return key;
    }
    
    return null;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchProductsFromFirebase,
        fetchProductsFromRealtimeDB,
        groupProductsByCategory,
        DEFAULT_MATERIAL
    };
}

