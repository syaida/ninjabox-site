# 🔥 Firebase Stock System Integration Guide

## Overview

This guide will help you connect your stock management system (https://stock-management-pro-86e06.web.app/) to your website so that product data is automatically fetched and displayed.

**Key Features:**
- ✅ Automatically fetches products from Firebase
- ✅ Defaults all ready stock to **"B-Flute Corrugated"** material
- ✅ Dynamically renders catalogue from your stock data
- ✅ Falls back to static HTML if Firebase is unavailable
- ✅ Supports both Firestore and Realtime Database

---

## 📋 Prerequisites

1. **Firebase Project** - Your stock management system should be using Firebase
2. **Firebase Console Access** - You need access to your Firebase project settings
3. **Product Data Structure** - Your products should have these fields (or similar):
   - `name` or `productName`
   - `category` or `type`
   - `size` or `sizeName`
   - `dimensions`
   - `material` (will default to "B-Flute Corrugated" if missing)
   - `status` (should be "ready", "available", or "in stock")
   - `image` or `imageUrl` (optional)

---

## 🚀 Setup Steps

### **STEP 1: Get Your Firebase Configuration**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (the one used by your stock management system)
3. Click the **⚙️ Settings** icon > **Project settings**
4. Scroll down to **"Your apps"** section
5. If you don't have a web app, click **"Add app"** > **Web** (</> icon)
6. Copy the **firebaseConfig** object

It should look like this:
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

---

### **STEP 2: Update Firebase Config**

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "YOUR_ACTUAL_AUTH_DOMAIN",
    projectId: "YOUR_ACTUAL_PROJECT_ID",
    storageBucket: "YOUR_ACTUAL_STORAGE_BUCKET",
    messagingSenderId: "YOUR_ACTUAL_MESSAGING_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};

// Uncomment these lines:
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    if (typeof initializeFirebase === 'function') {
        initializeFirebase(firebaseConfig);
    }
}
```

---

### **STEP 3: Configure Database Access**

#### **Option A: Using Firestore (Recommended)**

1. In Firebase Console, go to **Firestore Database**
2. Check your **collection name** (usually `products` or `items`)
3. Verify your product documents have the required fields
4. Set up **Firestore Security Rules** to allow read access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to products
    match /products/{document=**} {
      allow read: if true;
      allow write: if false; // Only allow reads
    }
  }
}
```

#### **Option B: Using Realtime Database**

1. In Firebase Console, go to **Realtime Database**
2. Check your **data structure** (usually `/products`)
3. Set up **Realtime Database Rules** to allow read access:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": false
    }
  }
}
```

---

### **STEP 4: Verify Product Data Structure**

Your products in Firebase should look like this:

**Firestore Example:**
```javascript
{
  name: "PZ01 (8\")",
  category: "Pizza Box",
  size: "PZ01 (8\")",
  dimensions: "20.8cm x 20.8cm x 3.8cm",
  material: "B-Flute Corrugated", // Optional - will default if missing
  status: "ready", // or "available" or "in stock"
  stock: 100,
  highlight: false, // Optional - for featured products
  badge: "Best Seller" // Optional - for badges
}
```

**Realtime Database Example:**
```json
{
  "products": {
    "product1": {
      "name": "PZ01 (8\")",
      "category": "Pizza Box",
      "size": "PZ01 (8\")",
      "dimensions": "20.8cm x 20.8cm x 3.8cm",
      "material": "B-Flute Corrugated",
      "status": "ready",
      "stock": 100
    }
  }
}
```

---

### **STEP 5: Customize Category Mapping**

If your product categories don't match exactly, edit `catalogue-loader.js`:

```javascript
const CATEGORY_MAPPING = {
    'pizza': ['pizza', 'pz', 'pizza box', 'your-custom-keyword'],
    'mailer': ['mailer', 'mb', 'mailer box', 'your-custom-keyword'],
    'rsc': ['rsc', 'regular slotted', 'rsc box', 'your-custom-keyword'],
    'document': ['document', 'archive', 'document box', 'your-custom-keyword']
};
```

---

## 🔧 Troubleshooting

### **Products Not Loading?**

1. **Check Browser Console** (F12) for errors
2. **Verify Firebase Config** - Make sure all values are correct
3. **Check Database Rules** - Ensure read access is allowed
4. **Verify Collection Name** - Default is `products`, change in `catalogue-loader.js` if different
5. **Check Product Status** - Products must have `status: "ready"` or `"available"`

### **Products Showing Wrong Category?**

1. **Check Category Mapping** - Edit `CATEGORY_MAPPING` in `catalogue-loader.js`
2. **Verify Product Names** - Product names should contain category keywords
3. **Check Category Field** - Ensure `category` field matches mapping keywords

### **Material Not Showing "B-Flute Corrugated"?**

- The system automatically defaults to "B-Flute Corrugated" if `material` field is missing
- If you want to override, set `material: "B-Flute Corrugated"` in your Firebase data

### **Images Not Loading?**

- Ensure image URLs are accessible
- Check if images are stored in Firebase Storage
- Update image paths in `CATEGORY_INFO` if using different image names

---

## 📊 Data Field Mapping

| Website Field | Firebase Field (Priority Order) |
|--------------|--------------------------------|
| Product Name | `name` → `productName` |
| Category | `category` → `type` |
| Size | `size` → `sizeName` |
| Dimensions | `dimensions` → `size` |
| Material | `material` → **Default: "B-Flute Corrugated"** |
| Stock | `stock` → `quantity` → `availableStock` |
| Image | `image` → `imageUrl` |
| Badge | `badge` → `tag` |
| Highlight | `highlight` → `featured` |

---

## 🎯 Default Material Setting

**All ready stock items automatically default to "B-Flute Corrugated"** if the `material` field is:
- Missing
- Empty
- Null
- Undefined

To use a different material, simply set the `material` field in your Firebase data.

---

## 🔄 How It Works

1. **Page Loads** → Firebase SDK initializes
2. **Fetch Products** → Queries Firebase for products with `status: "ready"`
3. **Group by Category** → Automatically categorizes products
4. **Render Catalogue** → Dynamically generates HTML tables
5. **Fallback** → If Firebase fails, shows static HTML

---

## ✅ Testing

1. **Open your website** in a browser
2. **Open Developer Console** (F12)
3. **Check for errors** - Should see "✅ Firebase initialized"
4. **Navigate to Catalogue** section
5. **Verify products load** - Should see "✅ Loaded X products from Firebase"
6. **Check material** - All should show "B-Flute Corrugated" (or your set material)

---

## 🚨 Security Notes

- **Read-Only Access**: The website only reads data, never writes
- **Public Access**: Products are publicly visible (as intended for a catalogue)
- **No Sensitive Data**: Don't store prices, costs, or internal data in products collection
- **Rate Limiting**: Firebase free tier has limits, but should be fine for a catalogue

---

## 📝 Next Steps

1. ✅ Get Firebase config
2. ✅ Update `firebase-config.js`
3. ✅ Set database rules
4. ✅ Test product loading
5. ✅ Customize category mapping if needed
6. ✅ Verify material defaults correctly

---

## 💡 Tips

- **Use Firestore** for better querying and structure
- **Add images** to Firebase Storage and reference them in product data
- **Use badges** (`badge` field) to highlight popular products
- **Use highlight** (`highlight` field) to feature products
- **Keep product names consistent** for better category matching

---

## 🆘 Need Help?

If you encounter issues:
1. Check browser console for errors
2. Verify Firebase config is correct
3. Ensure database rules allow read access
4. Check product data structure matches expected format

**Your website will automatically fall back to static HTML if Firebase is unavailable, so your site will always work!** 🎉

