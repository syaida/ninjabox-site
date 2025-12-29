# 🔧 Fix Git Push Permission Issue

## Problem
You're getting: `Permission to ninjabox26/ninjabox-site.git denied to syaida`

This means the GitHub account `syaida` doesn't have permission to push to `ninjabox26/ninjabox-site`.

---

## Solution Options

### Option 1: Use Personal Access Token (Recommended)

1. **Create Personal Access Token**
   - Go to: https://github.com/settings/tokens
   - Click **"Generate new token"** → **"Generate new token (classic)"**
   - Name: `Netlify Auto-Deploy`
   - Expiration: `90 days` (or your preference)
   - Scopes: Check **`repo`** (full control of private repositories)
   - Click **"Generate token"**
   - **COPY THE TOKEN** (you won't see it again!)

2. **Update Remote URL with Token**
   ```bash
   cd "C:\Users\ninja-box\OneDrive\Documents\ninjabox-site"
   git remote set-url origin https://YOUR_TOKEN@github.com/ninjabox26/ninjabox-site.git
   ```
   Replace `YOUR_TOKEN` with the token you copied.

3. **Push Again**
   ```bash
   git push origin main
   ```

---

### Option 2: Switch to Your Own Repository

If you want to use your own GitHub account (`syaida`):

1. **Create New Repository on GitHub**
   - Go to: https://github.com/new
   - Repository name: `ninjabox-site`
   - Make it **Public**
   - Click **"Create repository"**

2. **Update Remote URL**
   ```bash
   cd "C:\Users\ninja-box\OneDrive\Documents\ninjabox-site"
   git remote set-url origin https://github.com/syaida/ninjabox-site.git
   ```

3. **Push to Your Repository**
   ```bash
   git push -u origin main
   ```

4. **Update Netlify**
   - Go to Netlify dashboard
   - Site settings → Build & deploy → Continuous Deployment
   - Click **"Link to a different branch"**
   - Select your new repository: `syaida/ninjabox-site`

---

### Option 3: Get Access to ninjabox26 Repository

If you need to use the `ninjabox26` repository:

1. **Ask Repository Owner**
   - Contact the owner of `ninjabox26` account
   - Ask them to add you as a collaborator:
     - Go to repository → Settings → Collaborators
     - Add `syaida` as a collaborator

2. **Then Push**
   ```bash
   git push origin main
   ```

---

## Quick Commands Reference

After fixing permissions, use these commands to push updates:

```bash
# Navigate to project
cd "C:\Users\ninja-box\OneDrive\Documents\ninjabox-site"

# Add all changes
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub (triggers Netlify auto-deploy)
git push origin main
```

---

## Which Option Should You Choose?

- **Option 1** if you have access to `ninjabox26` account
- **Option 2** if you want to use your own GitHub account
- **Option 3** if you need to collaborate on the existing repository

---

## After Fixing

Once you can push successfully:
1. Netlify will automatically detect the push
2. It will start deploying your site
3. Your site will update in 1-2 minutes!

🎉 That's it!

