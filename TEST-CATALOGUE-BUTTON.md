# 🔧 Test Catalogue Button Functionality

## Quick Test Steps

1. **Open your website**
2. **Open browser console** (Press F12)
3. **Click "Request Catalogue (PDF)" button**
4. **Check console for:**
   - `Opening catalogue form...` ✅
   - `Modal opened successfully` ✅
   - If you see errors, note them down

## Expected Behavior

1. ✅ Button click → Modal opens
2. ✅ Form appears with fields
3. ✅ Fill in form → Click "Submit & Download PDF"
4. ✅ PDF downloads automatically
5. ✅ Lead saved to Firebase
6. ✅ Success message shown

## If Button Doesn't Work

### Check 1: Console Errors
- Open browser console (F12)
- Look for red error messages
- Share the error messages

### Check 2: Button Click
- Right-click button → Inspect
- Check if `onclick="openCatalogueForm()"` is present
- Try clicking button and check console

### Check 3: JavaScript Loaded
- In console, type: `typeof openCatalogueForm`
- Should return: `"function"`
- If returns `"undefined"`, JavaScript not loaded

### Check 4: Modal Exists
- In console, type: `document.getElementById('catalogueModal')`
- Should return the modal element
- If returns `null`, modal doesn't exist

## Common Issues

### "openCatalogueForm is not defined"
**Solution:** Check that `script.js` is loaded after the button

### "Cannot read property 'style' of null"
**Solution:** Modal element not found - check HTML

### Button does nothing
**Solution:** 
- Check console for errors
- Verify JavaScript files are loaded
- Try hard refresh (Ctrl+F5)

## Debug Commands

Run these in browser console (F12):

```javascript
// Test if function exists
typeof openCatalogueForm

// Test if modal exists
document.getElementById('catalogueModal')

// Manually open modal
openCatalogueForm()

// Check if form exists
document.getElementById('catalogueForm')
```

---

## After Fixing

Once button works:
1. Click button → Modal opens ✅
2. Fill form → Submit ✅
3. PDF downloads ✅
4. Lead saved to Firebase ✅

Good luck! 🚀

