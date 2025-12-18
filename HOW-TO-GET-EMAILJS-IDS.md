# 🔑 How to Get Your EmailJS IDs - Step by Step

## 📋 What You Need

You need **3 things** from EmailJS:
1. **Public Key** (Account Key)
2. **Service ID** (Email Service)
3. **Template ID** (Email Template)

---

## 🚀 Step-by-Step Guide

### **STEP 1: Sign Up / Log In**

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (or **"Log In"** if you have an account)
3. Sign up with Google, GitHub, or Email
4. **It's FREE** for up to 200 emails per month!

---

## 🔑 STEP 2: Get Your PUBLIC KEY

### **Location: Account Settings**

1. After logging in, click on your **profile icon** (top right)
2. Click **"Account"** or **"General"**
3. Look for **"Public Key"** section
4. You'll see something like: `abcdefghijklmnop123456`
5. **Click the copy button** or select and copy it

**What it looks like:**
```
Public Key
─────────────────────────────
abcdefghijklmnop1234567890
[Copy] button
```

**📝 Save this:** `YOUR_PUBLIC_KEY = abcdefghijklmnop1234567890`

---

## 📧 STEP 3: Create Email Service & Get SERVICE ID

### **A. Create Email Service**

1. In EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"** button
3. Choose your email provider:
   - **Gmail** (easiest - recommended)
   - **Outlook**
   - **Yahoo**
   - Or **Custom SMTP**

### **B. Connect Gmail (Recommended)**

1. Select **"Gmail"**
2. Click **"Connect Account"**
3. Sign in with your Gmail account
4. Allow EmailJS to send emails
5. Click **"Create Service"**

### **C. Get Service ID**

1. After creating, you'll see your service listed
2. Look for **"Service ID"** - it looks like: `service_abc123`
3. **Copy this ID**

**What it looks like:**
```
Email Services
─────────────────────────────
Gmail
Service ID: service_abc123xyz
[Copy] button
```

**📝 Save this:** `YOUR_SERVICE_ID = service_abc123xyz`

---

## 📝 STEP 4: Create Email Template & Get TEMPLATE ID

### **A. Create Template**

1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"** button
3. Give it a name: **"Catalogue PDF"**

### **B. Set Up Template**

**Template Name:** `Catalogue PDF`

**Subject Line:**
```
NinjaBox Product Catalogue - Requested by {{to_name}}
```

**Email Content:**
```
Dear {{to_name}},

Thank you for requesting our product catalogue!

As requested, please find attached our complete NinjaBox Product Catalogue PDF.

{{#if user_company}}
Company: {{user_company}}
{{/if}}

{{#if product_interest}}
Product Interest: {{product_interest}}
{{/if}}

{{#if user_message}}
Your Message: {{user_message}}
{{/if}}

If you have any questions or need a custom quote, please don't hesitate to contact us:

Email: enquiry@ninjabox.my
Phone: 017-228 9028

Best regards,
NinjaBox Team
```

### **C. Configure Template Variables**

In the template, make sure these variables are available:
- `to_name` - User's name
- `to_email` - User's email
- `user_name` - User's name
- `user_email` - User's email
- `user_phone` - User's phone
- `user_company` - User's company
- `product_interest` - Product interest
- `user_message` - User's message

### **D. Get Template ID**

1. After saving, you'll see your template listed
2. Look for **"Template ID"** - it looks like: `template_xyz789`
3. **Copy this ID**

**What it looks like:**
```
Email Templates
─────────────────────────────
Catalogue PDF
Template ID: template_xyz789abc
[Copy] button
```

**📝 Save this:** `YOUR_TEMPLATE_ID = template_xyz789abc`

---

## 🔧 STEP 5: Update Your Website Code

### **Open `script.js` file**

Find these lines (around line 330-340):

### **A. Update Public Key**

**FIND:**
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key
```

**REPLACE WITH:**
```javascript
emailjs.init("abcdefghijklmnop1234567890"); // Your actual Public Key
```

### **B. Update Service ID and Template ID**

**FIND:**
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
```

**REPLACE WITH:**
```javascript
emailjs.send('service_abc123xyz', 'template_xyz789abc', emailParams)
// Replace with your actual Service ID and Template ID
```

---

## ✅ Quick Checklist

Before testing, make sure you have:

- [ ] ✅ EmailJS account created
- [ ] ✅ Public Key copied
- [ ] ✅ Email Service connected (Gmail/Outlook)
- [ ] ✅ Service ID copied
- [ ] ✅ Email Template created
- [ ] ✅ Template ID copied
- [ ] ✅ All 3 IDs updated in `script.js`

---

## 🧪 Testing

1. **Save** `script.js` file
2. **Refresh** your website (Ctrl+F5)
3. **Fill out** the catalogue request form
4. **Submit** the form
5. **Check** your email inbox
6. **Check** the user's email inbox

---

## 📍 Where to Find IDs in Dashboard

### **Dashboard Layout:**

```
EmailJS Dashboard
├── 📧 Email Services
│   └── Service ID: service_xxxxx
│
├── 📝 Email Templates  
│   └── Template ID: template_xxxxx
│
└── ⚙️ Account (Profile Icon)
    └── Public Key: xxxxxxxxxxxxxx
```

---

## 🆘 Common Issues

### **"Public Key not found"**
- Go to: **Profile Icon** → **Account** → **General**
- Look for **"Public Key"** or **"API Keys"**

### **"Service ID not found"**
- Go to: **Email Services** (left sidebar)
- Click on your service
- Service ID is shown at the top

### **"Template ID not found"**
- Go to: **Email Templates** (left sidebar)
- Click on your template
- Template ID is shown at the top

### **"Email not sending"**
- Check Service ID and Template ID are correct
- Verify Public Key is correct
- Check email service is connected
- Open browser console (F12) to see errors

---

## 💡 Pro Tips

1. **Keep IDs safe** - Don't share them publicly
2. **Test first** - Send a test email to yourself
3. **Check spam folder** - First emails might go to spam
4. **Free limit** - 200 emails/month (enough for testing)

---

## 📞 Need More Help?

- **EmailJS Docs:** https://www.emailjs.com/docs/
- **EmailJS Support:** support@emailjs.com
- **Video Tutorial:** Search "EmailJS setup tutorial" on YouTube

---

**Once you have all 3 IDs, update `script.js` and you're ready to go!** 🚀

