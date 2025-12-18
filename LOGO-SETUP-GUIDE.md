# 🎨 NinjaBox Logo Setup Guide

## 📍 Where Your Logo Appears

Your logo has been set up in **3 key locations**:

### 1. **Navigation Bar (Header)** ⭐ MOST IMPORTANT
- **Location**: Top-left corner, visible on every page
- **File needed**: `logo.png`
- **Recommended size**: 180px wide × 45px high (PNG with transparent background)

### 2. **Footer**
- **Location**: Bottom of the page, first column
- **File needed**: `logo-white.png` (white/light version for dark footer background)
- **Recommended size**: 200px wide × 60px high

### 3. **Favicon (Browser Tab)**
- **Location**: Browser tab icon
- **File needed**: `logo-icon.png`
- **Recommended size**: 192px × 192px (square, PNG)

---

## 📁 Step-by-Step Setup Instructions

### **STEP 1: Prepare Your Logo Files**

You need **3 logo files**:

1. **logo.png** - For navigation bar
   - Dimensions: 180px wide × 45px high (approx)
   - Format: PNG with transparent background
   - Color: Use your brand colors (works on white background)

2. **logo-white.png** - For footer
   - Dimensions: 200px wide × 60px high (approx)
   - Format: PNG with transparent background
   - Color: White or light version (works on black background)

3. **logo-icon.png** - For favicon
   - Dimensions: 192px × 192px (square)
   - Format: PNG
   - Content: Icon or simplified logo mark

---

### **STEP 2: Upload Logo Files**

Place all 3 logo files in the **root folder** of your website:

```
ninjabox-site/
├── index.html
├── styles.css
├── script.js
├── logo.png          ← Add this
├── logo-white.png    ← Add this
└── logo-icon.png     ← Add this
```

---

### **STEP 3: Activate Your Logos**

#### **A. Navigation Logo (Header)**

Open `index.html` and find **line 22-25**:

**REMOVE THIS:**
```html
<!-- OPTION 2: Text Logo (Current) - Remove this when you add image logo -->
<h1>NinjaBox<span class="highlight">.</span></h1>
```

**UNCOMMENT THIS:**
```html
<!-- OPTION 1: Image Logo (Recommended) - Uncomment and add your logo file -->
<img src="logo.png" alt="NinjaBox Logo" class="logo-image">
```

**Result should look like:**
```html
<a href="#home" class="logo">
    <img src="logo.png" alt="NinjaBox Logo" class="logo-image">
</a>
```

---

#### **B. Footer Logo**

Open `index.html` and find **line 655-658**:

**REMOVE THIS:**
```html
<!-- OPTION 2: Text Logo (Current) -->
<h3>NinjaBox<span class="highlight">.</span></h3>
```

**UNCOMMENT THIS:**
```html
<!-- OPTION 1: Image Logo in Footer (Recommended) -->
<img src="logo-white.png" alt="NinjaBox Logo" class="footer-logo">
```

**Result should look like:**
```html
<div class="footer-section">
    <img src="logo-white.png" alt="NinjaBox Logo" class="footer-logo">
    <p>Premium packaging solutions for your business needs.</p>
</div>
```

---

#### **C. Favicon (Browser Tab)**

The favicon is already set up in `index.html` **line 9-10**:

```html
<link rel="icon" type="image/png" href="logo-icon.png">
<link rel="apple-touch-icon" href="logo-icon.png">
```

Just make sure you have the `logo-icon.png` file in your root folder!

---

## 🎨 Logo Design Tips

### **For Navigation Logo (logo.png)**
- ✅ Use horizontal layout (wider than tall)
- ✅ Transparent background
- ✅ High contrast (readable on white)
- ✅ Clean and simple design
- ✅ File size: Keep under 50KB

### **For Footer Logo (logo-white.png)**
- ✅ White or light-colored version
- ✅ Transparent background
- ✅ Visible on dark/black backgrounds
- ✅ Same design as header logo, just different color

### **For Favicon (logo-icon.png)**
- ✅ Square format (192×192px or 512×512px)
- ✅ Simple icon or monogram
- ✅ Recognizable at small sizes
- ✅ Works in tiny 16×16px display

---

## 📐 Recommended Dimensions

| Location | Width | Height | Background | Format |
|----------|-------|--------|------------|--------|
| **Navigation** | 180px | 45px | Transparent | PNG |
| **Footer** | 200px | 60px | Transparent | PNG |
| **Favicon** | 192px | 192px | Solid/Trans | PNG |

**Note**: These are maximum sizes. Your logo will scale down automatically on mobile devices.

---

## 🚀 Quick Start (If You Only Have One Logo)

If you only have **one logo file**, here's what to do:

1. **Rename your logo** to `logo.png`
2. **Create a white version** and name it `logo-white.png`
3. **Create a square icon version** and name it `logo-icon.png`
4. Follow **STEP 3** above to activate them

---

## ✅ Testing Your Logo

After adding your logos:

1. **Refresh your website** (Ctrl+F5 or Cmd+Shift+R)
2. **Check navigation** - Logo should appear top-left
3. **Check footer** - Logo should appear in first column
4. **Check browser tab** - Icon should appear next to page title
5. **Test mobile** - Logo should resize properly

---

## ❓ Common Issues & Solutions

### **Logo not showing?**
- ✅ Check file names are exactly: `logo.png`, `logo-white.png`, `logo-icon.png`
- ✅ Make sure files are in the root folder (same folder as index.html)
- ✅ Clear browser cache (Ctrl+F5)
- ✅ Check you uncommented the image code and removed text logo

### **Logo too large/small?**
Edit `styles.css` and adjust these values:

```css
.logo-image {
    height: 45px;  /* Change this number */
}

.footer-logo {
    height: 60px;  /* Change this number */
}
```

### **Logo quality poor?**
- ✅ Use PNG format (not JPG)
- ✅ Export at 2x size for retina displays
- ✅ Use vector source (AI, SVG) if possible

---

## 🎯 Professional Tips

1. **Keep it simple** - Complex logos don't work well at small sizes
2. **Use SVG if possible** - Change `.png` to `.svg` for scalable vector graphics
3. **Optimize file size** - Use tools like TinyPNG.com to compress
4. **Test on mobile** - Make sure logo is readable on small screens
5. **Brand consistency** - Use same logo across all marketing materials

---

## 📞 Need Help?

If you need help creating or optimizing your logo files, consider:
- Hiring a graphic designer on Fiverr/Upwork
- Using tools like Canva.com for simple edits
- Asking your logo designer for web-optimized versions

---

**Good luck with your branding! 🚀**

