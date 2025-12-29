# 🔄 Switch to ninjabox-site Firebase Project

## Quick Steps to Get Your Config

Since you've already created the `ninjabox-site` project, follow these steps:

### Step 1: Get Firebase Config from ninjabox-site Project

1. **Go to your project**
   - Visit: https://console.firebase.google.com/project/ninjabox-site/overview
   - Sign in if needed

2. **Go to Project Settings**
   - Click the **⚙️ Settings** icon (gear icon) → **Project settings**
   - Or go directly to: https://console.firebase.google.com/project/ninjabox-site/settings/general

3. **Add Web App (if not done)**
   - Scroll to **"Your apps"** section
   - If no web app exists, click **Add app** → **Web** (`</>` icon)
   - App nickname: **NinjaBox Website** (or leave default)
   - **Do NOT** check "Also set up Firebase Hosting"
   - Click **Register app**

4. **Copy the Config**
   - You'll see the `firebaseConfig` code
   - Copy the entire config object
   - It should look like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "ninjabox-site.firebaseapp.com",
     projectId: "ninjabox-site",
     storageBucket: "ninjabox-site.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

### Step 2: Update firebase-config.js

1. Open `firebase-config.js` in your project
2. Replace the `firebaseConfig` object (lines 3-12) with your new config from Step 1
3. Save the file

### Step 3: Enable Firestore in ninjabox-site Project

1. **Go to Firestore Database**
   - Visit: https://console.firebase.google.com/project/ninjabox-site/firestore
   - Click **Create database** (if not already created)

2. **Create Database**
   - Choose **Start in test mode**
   - Location: **asia-southeast1** (Singapore)
   - Click **Enable**

3. **Set Security Rules**
   - Click **Rules** tab
   - Copy content from `firestore.rules` file
   - Paste and click **Publish**

### Step 4: Test It

1. Open `firebase-test.html` in your browser
2. Run all tests
3. If all pass ✅, you're done!

---

## What This Changes

✅ **Before:** Leads stored in `stock-management-pro-86e06` project  
✅ **After:** Leads stored in `ninjabox-site` project

✅ **Benefits:**
- Separate project for your website
- Clean organization
- No mixing with stock management data
- Easier to manage

---

## Verify It's Working

After updating:
1. Submit a test catalogue request form
2. Go to: https://console.firebase.google.com/project/ninjabox-site/firestore
3. Click on `leads` collection
4. You should see your test lead!

---

## Need Help Finding the Config?

The config is located at:
- **Direct link:** https://console.firebase.google.com/project/ninjabox-site/settings/general
- Scroll down to **"Your apps"** section
- Click on your web app
- Copy the `firebaseConfig` object

