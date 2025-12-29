# Leads Database Setup Guide

## Overview

The catalogue request form now saves user information as leads to Firebase Firestore database and automatically downloads the PDF.

## Flow

1. User clicks "Request Catalogue (PDF)" button
2. Form modal opens
3. User fills in their details
4. User clicks "Submit & Download PDF"
5. Lead is saved to Firebase database
6. PDF automatically downloads
7. Success message is shown

## Firebase Firestore Setup

### Step 1: Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `stock-management-pro-86e06`
3. Go to **Firestore Database** in the left menu
4. Click **Create database** (if not already created)
5. Start in **test mode** or **production mode**

### Step 2: Set Up Firestore Rules

Go to **Firestore Database** → **Rules** and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow reads and writes to leads collection
    match /leads/{leadId} {
      allow read, write: if true; // For testing - restrict in production
    }
    
    // Your existing rules for other collections...
  }
}
```

**For Production (More Secure):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow writes to leads (for saving form submissions)
    match /leads/{leadId} {
      allow write: if true; // Anyone can create leads
      allow read: if false; // Only admins can read (set up authentication)
    }
  }
}
```

### Step 3: Verify Collection Structure

The leads will be saved with this structure:

```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "0123456789",
  company: "ABC Company",
  interest: "Pizza Box",
  message: "Looking for custom sizes",
  source: "Catalogue Request",
  timestamp: [Server Timestamp],
  date: "2025-01-XX...",
  status: "new"
}
```

## Viewing Leads

### Option 1: Firebase Console
1. Go to **Firestore Database** → **Data**
2. Click on the **leads** collection
3. View all submitted leads

### Option 2: Export to CSV
1. In Firestore, select the **leads** collection
2. Use Firebase Extensions or third-party tools to export

## Database Location

- **Collection Name:** `leads`
- **Database:** Firestore (not Realtime Database)
- **Auto-generated ID:** Each lead gets a unique document ID

## Testing

1. Fill out the catalogue request form
2. Submit the form
3. Check Firebase Console → Firestore → `leads` collection
4. Verify the lead was saved
5. Verify PDF downloaded automatically

## Troubleshooting

### Leads not saving?
- Check Firebase Console for errors
- Verify Firestore is enabled
- Check Firestore rules allow writes
- Open browser console (F12) to see error messages

### PDF not downloading?
- Verify `2025 CATALOGUE NINJABOX.pdf` exists in root directory
- Check browser console for errors
- Some browsers block automatic downloads - user may need to allow

### Firebase not initialized?
- Check that Firebase SDK is loaded in `index.html`
- Verify `firebase-config.js` has correct configuration
- Check browser console for initialization errors

## Security Notes

⚠️ **Important:** The current rules allow anyone to write to the leads collection. This is fine for collecting leads, but:

1. **Don't allow public reads** - Leads contain personal information
2. **Set up authentication** if you want to view leads through the website
3. **Use Firebase Admin SDK** for server-side lead management
4. **Consider rate limiting** to prevent spam

## Next Steps

- Set up email notifications when new leads are created
- Create an admin dashboard to view/manage leads
- Export leads to CRM system
- Set up lead status tracking (new → contacted → converted)

