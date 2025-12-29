# Deployment Guide for NinjaBox Website

This guide will help you deploy your website to the internet. Choose the option that works best for you.

## 🚀 Quick Deploy Options

### Option 1: Netlify (Easiest - Recommended) ⭐

**Netlify is the easiest option and takes about 5 minutes!**

#### Method A: Drag & Drop (Fastest)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Create a free account (or sign in)
3. Drag your entire `ninjabox-site` folder onto the Netlify page
4. Wait for deployment (usually 30-60 seconds)
5. Your site is live! You'll get a URL like `https://random-name-123.netlify.app`

#### Method B: Git Integration (Best for updates)
1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository (name it `ninjabox-site`)
3. Upload all your files to GitHub:
   - Click "Upload files"
   - Drag all files from your `ninjabox-site` folder
   - Commit the changes
4. Go to [Netlify](https://app.netlify.com)
5. Click "Add new site" → "Import an existing project"
6. Choose "GitHub" and authorize Netlify
7. Select your `ninjabox-site` repository
8. Click "Deploy site"
9. Your site will auto-update whenever you push changes to GitHub!

#### Custom Domain Setup (ninjabox.my)
1. In Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter `ninjabox.my` and `www.ninjabox.my`
4. Follow Netlify's DNS instructions:
   - Add A record: `75.2.60.5`
   - Add CNAME: `www` → `your-site-name.netlify.app`
5. Wait for DNS propagation (can take up to 24 hours)

---

### Option 2: GitHub Pages (Free)

1. **Create GitHub Account**
   - Go to [github.com](https://github.com) and sign up

2. **Create Repository**
   - Click the "+" icon → "New repository"
   - Name it `ninjabox-site`
   - Make it **Public** (required for free GitHub Pages)
   - Click "Create repository"

3. **Upload Files**
   - Click "uploading an existing file"
   - Drag all files from your `ninjabox-site` folder
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to **Settings** → **Pages** (in your repository)
   - Under "Source", select **main branch** / **root**
   - Click **Save**
   - Your site will be at: `https://yourusername.github.io/ninjabox-site`

5. **Custom Domain (Optional)**
   - In Pages settings, add `ninjabox.my` in the Custom domain field
   - Add DNS records:
     - A Records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     - CNAME: `www` → `yourusername.github.io`

---

### Option 3: Vercel (Alternative - Also Easy)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import from GitHub (or drag & drop)
4. Deploy!

---

### Option 4: Traditional Web Hosting (cPanel/FTP)

If you have a web hosting account (like cPanel, Bluehost, etc.):

1. **Connect via FTP**
   - Use FileZilla or your hosting's file manager
   - Connect to your server

2. **Upload Files**
   - Navigate to `public_html` or `www` folder
   - Upload ALL files from your `ninjabox-site` folder
   - Make sure `index.html` is in the root

3. **Test Your Site**
   - Visit your domain (e.g., `https://ninjabox.my`)
   - Your site should be live!

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- ✅ All files are in the project folder
- ✅ `index.html` exists in the root
- ✅ All images are included (LOGO-NINJABOX1.png, etc.)
- ✅ Copyright year is updated to 2025
- ✅ Contact information is correct

---

## 🔄 Updating Your Site

### If using Netlify (Git method):
1. Make changes to your files locally
2. Push changes to GitHub
3. Netlify automatically deploys the update!

### If using Netlify (Drag & Drop):
1. Make changes to your files
2. Drag the folder to Netlify again
3. It will create a new deployment

### If using GitHub Pages:
1. Make changes to your files
2. Upload/commit changes to GitHub
3. GitHub Pages automatically updates (may take a few minutes)

---

## 🆘 Troubleshooting

### Site not loading?
- Check that `index.html` is in the root directory
- Verify all file paths are correct
- Clear browser cache (Ctrl+F5)

### Images not showing?
- Make sure all image files are uploaded
- Check file names match exactly (case-sensitive)
- Verify image paths in HTML

### Custom domain not working?
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- Verify domain is properly connected in hosting dashboard

---

## 📞 Need Help?

If you encounter any issues:
1. Check the error messages in your hosting dashboard
2. Verify all files are uploaded correctly
3. Make sure file permissions are set correctly (644 for files, 755 for folders)

---

## ✅ Recommended: Netlify

**Why Netlify?**
- ✅ Free forever
- ✅ Automatic HTTPS
- ✅ Easy drag & drop deployment
- ✅ Fast CDN
- ✅ Custom domain support
- ✅ Automatic deployments from Git

**Get started:** [https://app.netlify.com](https://app.netlify.com)

