# 🚀 Firebase Quick Start Guide

## Step-by-Step Setup (5 Minutes)

### Step 1: Enable Firestore (2 minutes)

1. Go to: https://console.firebase.google.com/
2. Select project: **stock-management-pro-86e06**
3. Click **Firestore Database** (left menu)
4. Click **Create database**
5. Choose **Start in test mode**
6. Select location: **asia-southeast1** (Singapore - closest to Malaysia)
7. Click **Enable**

✅ **Done!** Firestore is now enabled.

---

### Step 2: Set Security Rules (1 minute)

1. In Firestore Database, click **Rules** tab
2. Copy the entire content from `firestore.rules` file
3. Paste it into the rules editor
4. Click **Publish**

✅ **Done!** Security rules are set.

---

### Step 3: Test Connection (2 minutes)

1. Open `firebase-test.html` in your browser
2. Click **Test Firebase Connection** button
3. Click **Test Firestore Access** button
4. Click **Save Test Lead** button
5. Check Firebase Console → Firestore → `leads` collection

✅ **Done!** If all tests pass, Firebase is working!

---

## Verify It's Working

### In Your Website:
1. Open your website
2. Click "Request Catalogue (PDF)" button
3. Fill in the form
4. Submit the form
5. PDF should download automatically

### In Firebase Console:
1. Go to Firestore Database
2. Click on `leads` collection
3. You should see the lead you just submitted!

---

## Common Issues

### ❌ "Permission denied" error
**Solution:** Make sure you published the Firestore rules (Step 2)

### ❌ "Firestore not enabled" error
**Solution:** Enable Firestore Database (Step 1)

### ❌ Leads not appearing
**Solution:** 
- Refresh Firebase Console
- Check browser console for errors
- Verify rules allow writes to `leads` collection

---

## What's Next?

After setup is complete:
- ✅ Leads will automatically save to Firebase
- ✅ View leads in Firebase Console
- ✅ Export leads data when needed
- ✅ Set up email notifications (optional)

---

## Need Help?

1. Open browser console (F12) to see errors
2. Check `firebase-test.html` for detailed test results
3. Verify all steps above are completed

