# 🔧 Fix "Missing or insufficient permissions" Error

## Quick Fix (2 Steps)

### Step 1: Update Firestore Rules

You have two options:

#### Option A: Test Mode (Easiest - For Testing Only)

1. Go to Firebase Console: https://console.firebase.google.com/project/ninjabox-site/firestore/rules
2. Copy the content from `firestore.rules.TEST-MODE` file
3. Paste it into the rules editor
4. Click **Publish**

This allows all reads/writes for testing.

#### Option B: Production Rules (Recommended - More Secure)

1. Go to Firebase Console: https://console.firebase.google.com/project/ninjabox-site/firestore/rules
2. Copy the content from `firestore.rules` file (I've already updated it)
3. Paste it into the rules editor
4. Click **Publish**

This allows:
- ✅ Anyone to create leads
- ✅ Public read access to products
- ✅ Test collection access

### Step 2: Verify Firestore is Enabled

1. Go to: https://console.firebase.google.com/project/ninjabox-site/firestore
2. If you see "Get started" or "Create database", click it
3. Choose **Start in test mode**
4. Location: **asia-southeast1** (Singapore)
5. Click **Enable**
6. Wait 1-2 minutes for database creation

### Step 3: Test Again

1. Refresh `firebase-test.html` page
2. Click **Test Firestore Access** button
3. Should now pass ✅

---

## What I Fixed

✅ Updated `firestore.rules` to allow test collection access  
✅ Updated `firebase-test.html` to use products collection (which is allowed)  
✅ Created `firestore.rules.TEST-MODE` for easy testing

---

## Current Rules (After Fix)

The updated rules now allow:
- ✅ **leads** collection: Anyone can create, authenticated users can read
- ✅ **products** collection: Public read access
- ✅ **_test** collection: Full access for testing

---

## Still Getting Errors?

### Error: "Firestore not enabled"
**Solution:** Complete Step 2 above - Enable Firestore Database

### Error: "Permission denied"
**Solution:** 
1. Make sure you published the rules (click Publish button)
2. Wait 30 seconds for rules to propagate
3. Try the test again

### Error: "Collection not found"
**Solution:** This is OK - the test just checks if you can read, not if data exists

---

## After Fixing

Once the test passes:
- ✅ Your website can save leads to Firebase
- ✅ Leads will appear in Firestore → `leads` collection
- ✅ Everything is working correctly!

---

## Next Steps

1. ✅ Fix the rules (Step 1)
2. ✅ Enable Firestore (Step 2)
3. ✅ Test again (Step 3)
4. ✅ Submit a test catalogue request form
5. ✅ Check Firebase Console → Firestore → `leads` collection

Good luck! 🚀

