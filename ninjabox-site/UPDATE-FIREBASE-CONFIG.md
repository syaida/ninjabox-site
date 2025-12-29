# 📝 How to Update Firebase Config

## After Creating Your Firebase Account

Once you've created your Firebase project and added a web app, you need to update the configuration in your project files.

## Step 1: Get Your Firebase Config

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the **⚙️ Settings** icon → **Project settings**
4. Scroll down to **"Your apps"** section
5. Find your web app and click on it
6. You'll see the `firebaseConfig` object

## Step 2: Copy the Config

Copy the entire config object. It looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Step 3: Update firebase-config.js

1. Open `firebase-config.js` in your project
2. Replace the existing `firebaseConfig` object with your new one
3. Save the file

**Example:**
```javascript
// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_NEW_API_KEY",
    authDomain: "YOUR_NEW_AUTH_DOMAIN",
    projectId: "YOUR_NEW_PROJECT_ID",
    storageBucket: "YOUR_NEW_STORAGE_BUCKET",
    messagingSenderId: "YOUR_NEW_MESSAGING_SENDER_ID",
    appId: "YOUR_NEW_APP_ID"
};
```

## Step 4: Verify It Works

1. Open `firebase-test.html` in your browser
2. Check the browser console (F12)
3. You should see: `✅ Firebase initialized successfully`
4. Run all tests - they should pass ✅

## Important Notes

⚠️ **Keep Your Config Private**
- Don't commit sensitive config to public repositories
- The config is safe to use in frontend code (it's public by design)
- But don't share it unnecessarily

✅ **Config is Safe for Frontend**
- Firebase config is meant to be public
- Security is handled by Firestore rules
- Your API key is restricted by domain

## Troubleshooting

### Config not working?
- Make sure you copied the entire config object
- Check for typos or missing commas
- Verify the project is created and Firestore is enabled

### Still using old config?
- Clear browser cache (Ctrl+F5)
- Check that you saved the file
- Verify the file path is correct

---

After updating the config, your website will use your new Firebase project! 🎉

