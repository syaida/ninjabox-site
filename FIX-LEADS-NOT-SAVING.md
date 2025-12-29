# 🔧 Fix: Leads Not Being Saved to Firebase

## Quick Fix - Update Firestore Rules

The issue is likely that your Firestore rules are blocking writes. Here's how to fix it:

### Step 1: Go to Firestore Rules

1. Go to: https://console.firebase.google.com/project/ninjabox-site/firestore/rules
2. You should see the rules editor

### Step 2: Use These Rules (Copy & Paste)

Copy the ENTIRE content below and paste it into the rules editor:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // LEADS COLLECTION - Allow anyone to create leads
    match /leads/{leadId} {
      allow create: if true;  // ✅ Anyone can create leads
      allow read: if request.auth != null;  // Only authenticated users can read
      allow update, delete: if request.auth != null;
    }
    
    // PRODUCTS COLLECTION - Public read access
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // TEST COLLECTION - For testing
    match /_test/{document=**} {
      allow read, write: if true;
    }
    
    // DEFAULT - Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 3: Publish Rules

1. Click **Publish** button
2. Wait 30 seconds for rules to update
3. Try submitting the form again

---

## Alternative: Use Test Mode Rules (Temporary)

If you want to test quickly, you can use test mode rules temporarily:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Warning:** This allows anyone to read/write everything. Only use for testing!

---

## Check if Rules are Published

1. Go to Firestore Rules
2. Make sure you see your rules (not default test mode)
3. Check the timestamp - should show when rules were last published
4. If you see "Publish" button, rules are NOT published yet!

---

## Verify It's Working

1. Submit a test form on your website
2. Go to: https://console.firebase.google.com/project/ninjabox-site/firestore
3. Click on `leads` collection
4. You should see your lead!

---

## Debug: Check Browser Console

1. Open your website
2. Open browser console (F12)
3. Submit the form
4. Look for error messages:
   - `✅ Lead saved to Firebase database` = Working!
   - `❌ Error saving lead` = Check error message
   - `Permission denied` = Rules need to be updated

---

## Common Issues

### "Permission denied" error
**Solution:** Rules are blocking writes. Update rules (Step 2 above) and publish.

### "Firestore not initialized" error
**Solution:** Check that Firebase config is correct in `firebase-config.js`

### No error, but lead not appearing
**Solution:** 
- Check rules are published
- Wait 30 seconds after publishing rules
- Refresh Firebase Console
- Check browser console for errors

---

## Test Mode vs Production Mode

**Test Mode:**
- Allows all reads/writes for 30 days
- Good for testing
- Then switches to production (restrictive)

**Production Mode:**
- Uses your custom rules
- More secure
- Better for live website

**For your website:** Use production mode with the rules above (allows creating leads, but restricts reading).

---

## After Fixing

Once rules are updated:
- ✅ Leads will save automatically
- ✅ You can view them in Firebase Console
- ✅ Website will work correctly

Good luck! 🚀

