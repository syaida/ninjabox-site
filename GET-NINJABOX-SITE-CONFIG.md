# 🔥 Get Firebase Config for ninjabox-site Project

## Step 1: Get Your Firebase Configuration

Since you've already created the `ninjabox-site` project, follow these steps to get the config:

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/project/ninjabox-site/overview
   - Sign in with your Google account if needed

2. **Go to Project Settings**
   - Click the **⚙️ Settings** icon (gear icon) in the top left
   - Select **Project settings**

3. **Scroll to "Your apps" Section**
   - Scroll down to find **"Your apps"** section
   - If you don't have a web app yet, click **Add app** → **Web** (`</>` icon)
   - If you already have a web app, click on it

4. **Copy the Config**
   - You'll see a code snippet that looks like this:
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
   - **Copy this entire config object**

5. **Update firebase-config.js**
   - Open `firebase-config.js` in your project
   - Replace the existing config with your new one
   - Save the file

---

## Step 2: Enable Firestore Database

1. **Go to Firestore Database**
   - In Firebase Console, click **Firestore Database** (left menu)
   - If you see "Get started" or "Create database", click it

2. **Create Database**
   - Choose **Start in test mode**
   - Select location: **asia-southeast1** (Singapore - closest to Malaysia)
   - Click **Enable**
   - Wait for database creation (1-2 minutes)

---

## Step 3: Set Up Security Rules

1. **Go to Firestore Rules**
   - In Firestore Database, click **Rules** tab

2. **Update Rules**
   - Open `firestore.rules` file from this project
   - Copy all the content
   - Paste it into the Firebase Console rules editor
   - Click **Publish**

---

## Step 4: Test the Connection

1. **Update firebase-config.js**
   - Make sure you've updated it with the new config from Step 1

2. **Test**
   - Open `firebase-test.html` in your browser
   - Run all tests
   - If all pass ✅, you're done!

---

## What Changed?

- ✅ Now using `ninjabox-site` project (not stock-management-pro-86e06)
- ✅ Leads will be stored in the `ninjabox-site` project
- ✅ Separate from your stock management system
- ✅ Clean organization for your website

---

## Verify It's Working

After updating the config:
1. Submit a test catalogue request form
2. Go to Firebase Console → ninjabox-site project
3. Firestore Database → `leads` collection
4. You should see the lead you just submitted!

---

## Need Help?

If you can't find the config:
- Make sure you're in the correct project (ninjabox-site)
- Check that you've added a web app to the project
- The config is in Project Settings → Your apps section

