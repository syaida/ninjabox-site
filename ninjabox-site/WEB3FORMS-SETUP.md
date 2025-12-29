# 📧 Web3Forms Setup Guide - FREE Email with PDF Attachments

## 🎯 Why Web3Forms?

- ✅ **100% FREE** - No credit card required
- ✅ **Supports File Attachments** - PDFs work perfectly!
- ✅ **Easy Setup** - Just get one access key
- ✅ **No Backend Needed** - Works directly from your website
- ✅ **250 Submissions/Month** - Free tier limit

---

## 🚀 Quick Setup (2 Minutes)

### **STEP 1: Get Your Access Key**

1. Go to **https://web3forms.com/**
2. Enter your email address
3. Click **"Get Your Access Key"**
4. Check your email inbox
5. **Copy your access key** (looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

---

### **STEP 2: Update Your Code**

Open `script.js` and find this line (around line 600):

**FIND:**
```javascript
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
```

**REPLACE WITH:**
```javascript
const WEB3FORMS_ACCESS_KEY = "your-actual-access-key-here";
```

**Example:**
```javascript
const WEB3FORMS_ACCESS_KEY = "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
```

---

### **STEP 3: Configure Email Settings (Optional)**

1. Go to **https://web3forms.com/dashboard**
2. Log in with your email
3. Configure:
   - **Reply-to email** (where replies go)
   - **Email template** (customize the email)
   - **Notifications** (get notified when someone requests catalogue)

---

## ✅ That's It!

Once you update the access key, your form will:
1. Generate PDF catalogue
2. Send it as attachment to user's email
3. Send you a notification email too!

---

## 🧪 Testing

1. **Update** the access key in `script.js`
2. **Save** the file
3. **Refresh** your website (Ctrl+F5)
4. **Fill out** the catalogue form
5. **Submit** and check your email!

---

## 📧 What Users Receive

Users will get an email with:
- **Subject:** "NinjaBox Product Catalogue - Requested by [Name]"
- **Body:** Thank you message with their details
- **Attachment:** Complete PDF catalogue

---

## 📧 What You Receive

You'll get a notification email with:
- User's name, email, phone
- Company name
- Product interest
- Their message
- PDF attachment

---

## 🆘 Troubleshooting

### **"Access key not working"**
- Make sure you copied the full key
- Check for extra spaces
- Verify key is in quotes: `"your-key-here"`

### **"Email not received"**
- Check spam/junk folder
- Verify email address is correct
- Check Web3Forms dashboard for errors

### **"PDF not attaching"**
- Web3Forms supports attachments up to 25MB
- Your PDF should be fine (usually 1-2MB)
- Check browser console (F12) for errors

---

## 💡 Alternative: Formspree

If Web3Forms doesn't work, try **Formspree**:

1. Go to **https://formspree.io/**
2. Sign up (free)
3. Create a form
4. Get form endpoint
5. Update code to use Formspree API

---

## 📊 Comparison

| Service | Free Tier | Attachments | Setup Difficulty |
|---------|-----------|-------------|------------------|
| **Web3Forms** | ✅ 250/month | ✅ Yes | ⭐ Easy |
| **Formspree** | ✅ 50/month | ✅ Yes | ⭐⭐ Medium |
| **EmailJS** | ✅ 200/month | ❌ No (paid) | ⭐ Easy |
| **Getform** | ✅ 50/month | ✅ Yes | ⭐ Easy |

**Recommendation:** Web3Forms is the best free option! 🎯

---

## 🎉 Ready to Go!

Once you have your Web3Forms access key, just update one line in `script.js` and you're done!

**No payment needed. No credit card. 100% FREE!** 🚀

