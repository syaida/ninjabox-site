# 🚀 Auto-Deploy to Netlify Setup Guide

## Overview

Once set up, every time you push changes to GitHub, Netlify will automatically deploy your website. No more manual drag & drop!

---

## Step-by-Step Setup

### Step 1: Create GitHub Repository

1. **Go to GitHub**
   - Visit: https://github.com
   - Sign in or create an account

2. **Create New Repository**
   - Click the **"+"** icon (top right) → **"New repository"**
   - Repository name: `ninjabox-site` (or any name)
   - Make it **Public** (required for free Netlify auto-deploy)
   - **DO NOT** check "Initialize with README"
   - Click **"Create repository"**

3. **Copy Repository URL**
   - You'll see a page with setup instructions
   - Copy the repository URL (e.g., `https://github.com/yourusername/ninjabox-site.git`)

---

### Step 2: Initialize Git in Your Project

1. **Open Terminal/Command Prompt**
   - Navigate to your project folder:
   ```bash
   cd "C:\Users\ninja-box\OneDrive\Documents\ninjabox-site"
   ```

2. **Initialize Git** (if not already done)
   ```bash
   git init
   ```

3. **Add All Files**
   ```bash
   git add .
   ```

4. **Create First Commit**
   ```bash
   git commit -m "Initial commit - NinjaBox website"
   ```

5. **Connect to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/ninjabox-site.git
   ```
   (Replace `yourusername` with your GitHub username)

6. **Push to GitHub**
   ```bash
   git branch -M main
   git push -u origin main
   ```

---

### Step 3: Connect Netlify to GitHub

1. **Go to Netlify**
   - Visit: https://app.netlify.com
   - Sign in (or create account)

2. **Add New Site from Git**
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"GitHub"**
   - Authorize Netlify to access your GitHub account
   - Select your repository: `ninjabox-site`

3. **Configure Build Settings**
   - **Build command:** Leave empty (or `echo "No build step"`)
   - **Publish directory:** `.` (current directory)
   - Click **"Deploy site"**

4. **Wait for Deployment**
   - Netlify will deploy your site (takes 1-2 minutes)
   - You'll get a URL like: `https://random-name-123.netlify.app`

---

### Step 4: Verify Auto-Deploy is Working

1. **Make a Small Change**
   - Edit any file (e.g., add a comment to `index.html`)
   - Save the file

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push
   ```

3. **Check Netlify**
   - Go to Netlify dashboard
   - You should see a new deployment starting automatically!
   - Wait 1-2 minutes
   - Your site will be updated!

---

## How It Works

1. **You make changes** → Edit files locally
2. **Commit & Push** → `git add .`, `git commit -m "message"`, `git push`
3. **Netlify detects changes** → Automatically starts deployment
4. **Site updates** → Your live site is updated in 1-2 minutes!

---

## Quick Commands Reference

```bash
# After making changes, run these commands:

git add .                              # Stage all changes
git commit -m "Description of changes" # Commit changes
git push                               # Push to GitHub (triggers auto-deploy)
```

---

## Custom Domain Setup (Optional)

If you want to use `ninjabox.my`:

1. In Netlify dashboard → **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Enter: `ninjabox.my` and `www.ninjabox.my`
4. Follow DNS instructions

---

## Benefits

✅ **Automatic deployment** - No manual drag & drop  
✅ **Version history** - All changes tracked in Git  
✅ **Easy rollback** - Revert to previous versions if needed  
✅ **Team collaboration** - Multiple people can work on the site  
✅ **Deployment previews** - See changes before going live  

---

## Troubleshooting

### "Repository not found"
- Check repository name is correct
- Verify repository is Public (or you have Netlify access)

### "Build failed"
- Check Netlify build logs
- Verify `netlify.toml` is correct
- Make sure all files are committed to Git

### "No changes detected"
- Make sure you pushed to the correct branch (usually `main`)
- Check Netlify is connected to the right repository

---

## Next Steps

After setup:
1. Make any changes to your website
2. Run: `git add .`, `git commit -m "message"`, `git push`
3. Netlify automatically deploys!
4. Your site updates in 1-2 minutes

That's it! 🎉

