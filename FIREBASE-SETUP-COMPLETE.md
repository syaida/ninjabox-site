# 🔥 Complete Firebase Setup Guide for NinjaBox Website

## Current Status

✅ Firebase is already configured in your project:
- Project ID: `stock-management-pro-86e06`
- Configuration file: `firebase-config.js`
- Firebase SDK: Already loaded in `index.html`

## What You Need to Do

### Step 1: Enable Firestore Database

1. **Go to Firebase Console**
   - Visit: https://console.firebase.google.com/
   - Sign in with your Google account
   - Select project: **stock-management-pro-86e06**

2. **Create Firestore Database**
   - Click **Firestore Database** in the left menu
   - If you see "Get started" or "Create database", click it
   - Choose **Start in test mode** (we'll secure it later)
   - Select a **location** (choose closest to Malaysia, e.g., `asia-southeast1`)
   - Click **Enable**

### Step 2: Set Up Firestore Security Rules

1. In Firestore Database, click on the **Rules** tab
2. Copy and paste the rules from `firestore.rules` file (I'll create this)
3. Click **Publish**

**Rules allow:**
- ✅ Anyone to create leads (for form submissions)
- ✅ Only authenticated users to read leads (for security)
- ✅ Public read access to products (for catalogue)

### Step 3: Test Firebase Connection

1. Open your website in a browser
2. Open Developer Console (F12)
3. Look for: `✅ Firebase initialized successfully`
4. Submit a test catalogue request form
5. Check Firebase Console → Firestore → `leads` collection

## Quick Setup Checklist

- [ ] Firestore Database enabled
- [ ] Security rules published
- [ ] Test form submission works
- [ ] Lead appears in Firestore `leads` collection
- [ ] PDF downloads automatically

## Troubleshooting

### "Firebase not initialized" error?
- Check browser console for errors
- Verify Firebase SDK is loaded (check Network tab)
- Ensure `firebase-config.js` has correct credentials

### "Permission denied" when saving leads?
- Check Firestore rules are published
- Verify rules allow writes to `leads` collection
- Check browser console for specific error

### Leads not appearing in Firestore?
- Refresh Firebase Console
- Check the `leads` collection exists
- Verify form submission completed successfully

## Next Steps After Setup

1. **View Leads**: Go to Firebase Console → Firestore → `leads` collection
2. **Export Leads**: Use Firebase Console to export data
3. **Set Up Notifications**: Configure email alerts for new leads (optional)
4. **Secure Rules**: Update rules for production (restrict reads)

## Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify Firebase project settings
3. Ensure Firestore is enabled and rules are published

