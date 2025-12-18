# 📧 EmailJS Setup Guide - Send PDF Catalogue via Email

## 🎯 Overview

Your website is now configured to send the PDF catalogue directly to users' email addresses using EmailJS. Follow these steps to complete the setup.

---

## 📋 Step-by-Step Setup

### **STEP 1: Create EmailJS Account**

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (it's free for up to 200 emails/month)
3. Create your account

---

### **STEP 2: Create Email Service**

1. Log in to EmailJS dashboard
2. Go to **"Email Services"** → **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for easy setup)
   - **Outlook**
   - **Yahoo**
   - Or any SMTP service
4. Follow the connection steps
5. **Save your Service ID** (e.g., `service_abc123`)

---

### **STEP 3: Create Email Template**

1. Go to **"Email Templates"** → **"Create New Template"**
2. Use this template:

**Subject:**
```
NinjaBox Product Catalogue - Requested by {{to_name}}
```

**Content:**
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

3. **Important:** In the template settings, enable **"Attach File"** or add attachment field
4. **Save your Template ID** (e.g., `template_xyz789`)

---

### **STEP 4: Get Your Public Key**

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"**
3. Copy it (e.g., `abcdefghijklmnop`)

---

### **STEP 5: Update Your Website Code**

Open `script.js` and find these lines (around line 330-340):

**FIND:**
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS Public Key
```

**REPLACE WITH:**
```javascript
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY_HERE"); // Your EmailJS Public Key
```

**FIND:**
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
```

**REPLACE WITH:**
```javascript
emailjs.send('service_abc123', 'template_xyz789', emailParams)
// Replace with your actual Service ID and Template ID
```

---

## 🔧 Alternative: Simple Email Service (No Attachments)

If EmailJS doesn't support PDF attachments in your plan, you can:

### **Option A: Send Download Link**
Instead of attaching PDF, send a download link:
- Upload PDF to Google Drive/Dropbox
- Make it publicly accessible
- Send link in email

### **Option B: Use Form Submission Service**
- Use services like **Formspree**, **Getform**, or **Web3Forms**
- They can handle file uploads and email delivery

---

## ✅ Testing

1. **Update the code** with your EmailJS credentials
2. **Refresh your website**
3. **Fill out the catalogue request form**
4. **Submit** and check:
   - Your email inbox (you'll receive a copy)
   - User's email inbox (they'll receive the PDF)

---

## 📝 EmailJS Limits (Free Plan)

- **200 emails/month** (free)
- **Attachment size:** Check EmailJS documentation
- **Upgrade** if you need more emails

---

## 🆘 Troubleshooting

### **Email not sending?**
- ✅ Check Service ID and Template ID are correct
- ✅ Verify Public Key is correct
- ✅ Check email service is connected properly
- ✅ Check browser console for errors (F12)

### **PDF not attaching?**
- EmailJS free plan may not support large attachments
- Consider using a download link instead
- Or upgrade to paid plan

### **Need help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

---

## 🎉 Once Setup Complete

Your users will:
1. Fill out the form
2. Click "Download Catalogue PDF"
3. **Automatically receive PDF in their email!**
4. You'll also get a notification email

**No manual work needed!** 🚀

