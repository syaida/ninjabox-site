# 📝 How to Edit Your Catalogue Table Data

## 🎯 Quick Guide

Your catalogue now displays data in **professional tables** when users click to expand each category. Here's how to edit the data manually.

---

## 📍 Where to Edit

Open `index.html` and search for these comments to find each table:

- **Pizza Box**: Search for `<!-- EDIT BELOW: Pizza Box`
- **Mailer Box**: Search for `<!-- EDIT BELOW: Mailer Box`
- **RSC Box**: Search for `<!-- EDIT BELOW: RSC Box`
- **Document Box**: Search for `<!-- EDIT BELOW: Document Box`

---

## 📊 Table Structure

Each table row looks like this:

```html
<tr>
    <td><strong>Size Name</strong></td>
    <td>Dimensions</td>
    <td>Material Type</td>
    <td>Weight</td>
    <td>Minimum Order Quantity</td>
    <td><button class="btn-table" onclick="showInquiry('Product Name')">Quote</button></td>
</tr>
```

---

## ✏️ How to Edit Data

### **Example: Edit Pizza Box Medium**

**FIND THIS (around line 334 in index.html):**
```html
<!-- EDIT BELOW: Pizza Box Medium -->
<tr class="highlighted-row">
    <td><strong>Medium (12")</strong> <span class="table-badge">Best Seller</span></td>
    <td>12" x 12" x 2"</td>
    <td>E-Flute Corrugated</td>
    <td>400gsm</td>
    <td>500 units</td>
    <td><button class="btn-table" onclick="showInquiry('Pizza Box - Medium 12 inch')">Quote</button></td>
</tr>
```

**EDIT TO YOUR DATA:**
```html
<!-- EDIT BELOW: Pizza Box Medium -->
<tr class="highlighted-row">
    <td><strong>Medium (14")</strong> <span class="table-badge">Best Seller</span></td>
    <td>14" x 14" x 2.5"</td>
    <td>B-Flute Corrugated</td>
    <td>450gsm</td>
    <td>1000 units</td>
    <td><button class="btn-table" onclick="showInquiry('Pizza Box - Medium 14 inch')">Quote</button></td>
</tr>
```

---

## 📋 What Each Column Means

| Column | What to Edit | Example |
|--------|-------------|---------|
| **Size Name** | Between `<strong>` tags | `<strong>Medium (12")</strong>` |
| **Dimensions** | Between first `<td>` and `</td>` after size | `12" x 12" x 2"` |
| **Material** | Between second `<td>` and `</td>` | `E-Flute Corrugated` |
| **Weight** | Between third `<td>` and `</td>` | `400gsm` |
| **MOQ** | Between fourth `<td>` and `</td>` | `500 units` |

---

## 🏷️ Adding/Removing Badges

### **To Add a Badge:**
```html
<td><strong>Small (10")</strong> <span class="table-badge">New!</span></td>
```

### **To Remove a Badge:**
```html
<td><strong>Small (10")</strong></td>
```

**Available Badge Styles:**
- `<span class="table-badge">Best Seller</span>`
- `<span class="table-badge">Popular</span>`
- `<span class="table-badge">New!</span>`
- `<span class="table-badge">Premium</span>`
- `<span class="table-badge">Best Value</span>`

---

## ✨ Highlighting a Row

To make a row stand out with light orange background:

**Add** `class="highlighted-row"` to the `<tr>` tag:

```html
<tr class="highlighted-row">
```

**Regular row (no highlight):**
```html
<tr>
```

---

## ➕ Adding a New Row

To add a new size (e.g., Extra Large Pizza Box):

**Copy this template:**
```html
<!-- EDIT BELOW: Pizza Box Extra Large -->
<tr>
    <td><strong>Extra Large (16")</strong></td>
    <td>16" x 16" x 2"</td>
    <td>E-Flute Corrugated</td>
    <td>500gsm</td>
    <td>500 units</td>
    <td><button class="btn-table" onclick="showInquiry('Pizza Box - Extra Large 16 inch')">Quote</button></td>
</tr>
```

**Paste it** inside the `<tbody>` section, before the `</tbody>` closing tag.

---

## 🗑️ Removing a Row

To remove a size variant:

**Delete everything** from `<tr>` to `</tr>` including the comment above it:

```html
<!-- Delete this entire block -->
<!-- EDIT BELOW: Pizza Box Small -->
<tr>
    <td><strong>Small (10")</strong></td>
    <td>10" x 10" x 2"</td>
    <td>E-Flute Corrugated</td>
    <td>350gsm</td>
    <td>500 units</td>
    <td><button class="btn-table" onclick="showInquiry('Pizza Box - Small 10 inch')">Quote</button></td>
</tr>
<!-- Delete up to here -->
```

---

## 🎨 Complete Example: Editing All Pizza Box Sizes

**BEFORE:**
```html
<tbody>
    <tr>
        <td><strong>Small (10")</strong></td>
        <td>10" x 10" x 2"</td>
        <td>E-Flute Corrugated</td>
        <td>350gsm</td>
        <td>500 units</td>
        <td><button class="btn-table" onclick="showInquiry('Pizza Box - Small')">Quote</button></td>
    </tr>
</tbody>
```

**AFTER (Your Custom Data):**
```html
<tbody>
    <tr>
        <td><strong>Small (9")</strong></td>
        <td>9" x 9" x 1.5"</td>
        <td>B-Flute Corrugated</td>
        <td>300gsm</td>
        <td>1000 units</td>
        <td><button class="btn-table" onclick="showInquiry('Pizza Box - Small 9 inch')">Quote</button></td>
    </tr>
</tbody>
```

---

## 📍 All Table Locations in index.html

| Product | Search For | Approximate Line |
|---------|-----------|------------------|
| **Pizza Box** | `<!-- EDIT BELOW: Pizza Box Small -->` | Line 325 |
| **Mailer Box** | `<!-- EDIT BELOW: Mailer Box Small -->` | Line 375 |
| **RSC Box** | `<!-- EDIT BELOW: RSC Box Small -->` | Line 425 |
| **Document Box** | `<!-- EDIT BELOW: Document Box Standard -->` | Line 475 |

---

## ⚠️ Important Tips

1. **Don't delete** the `<thead>` section (table headers)
2. **Keep the structure** - every `<tr>` needs matching `</tr>`
3. **Save the file** after editing
4. **Refresh browser** with Ctrl+F5 to see changes
5. **Test the Quote button** - make sure product names match

---

## 🆘 Need Help?

If something breaks:
1. You have a backup: `index-backup.html`
2. Copy and replace from the backup
3. Make small changes one at a time
4. Test after each change

---

**Happy editing! 📝**

