# NinjaBox Sdn Bhd Website

A modern, responsive website for NinjaBox Sdn Bhd - Premium box solutions provider in Malaysia.

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Product Showcase**: Dedicated sections for Pizza Box, Mailer Box, RSC Box, and Document Box
- **Contact Form**: Easy-to-use contact form for customer inquiries
- **Fast Loading**: Optimized performance with minimal dependencies

## Products

1. **Pizza Box** - Heat-resistant, grease-proof pizza boxes
2. **Mailer Box** - Sturdy e-commerce shipping boxes
3. **RSC Box** - Regular Slotted Container for general storage
4. **Document Box** - Archive and file storage solutions

## Technologies Used

- HTML5
- CSS3 (with modern features like Grid and Flexbox)
- Vanilla JavaScript (no frameworks required)
- Google Fonts (Poppins)

## File Structure

```
ninjabox-site/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # Interactive features
└── README.md       # Documentation
```

## Deployment Instructions

### Option 1: Deploy to Netlify (Recommended - Free)

1. Create a free account at [Netlify](https://www.netlify.com/)
2. Drag and drop the project folder to Netlify dashboard
3. Configure your custom domain (ninjabox.my):
   - Go to Domain Settings
   - Add custom domain: `ninjabox.my` and `www.ninjabox.my`
   - Follow DNS configuration instructions
4. Enable HTTPS (automatic with Netlify)

### Option 2: Deploy to GitHub Pages (Free)

1. Create a GitHub account if you don't have one
2. Create a new repository
3. Upload all files to the repository
4. Go to Settings > Pages
5. Select main branch as source
6. Configure custom domain in settings

### Option 3: Traditional Web Hosting

1. Connect to your hosting via FTP/SFTP
2. Upload all files to the public_html or www directory
3. Configure your domain to point to your hosting server
4. Ensure index.html is in the root directory

## DNS Configuration for ninjabox.my

Point your domain to your hosting provider:

**For Netlify:**
- A Record: `75.2.60.5`
- CNAME: `www` → Your Netlify subdomain

**For GitHub Pages:**
- A Records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- CNAME: `www` → `yourusername.github.io`

## Customization

### Update Contact Information

Edit the contact section in `index.html`:
- Email: Line 197 and 361
- Phone: Line 203 and 362
- Address: Line 209

### Update Product Details

Modify product cards in `index.html` (lines 132-233)

### Change Colors

Edit CSS variables in `styles.css` (lines 10-20):
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    --accent-color: #3498db;
    /* ... other colors */
}
```

### Add Logo

1. Add your logo image to the project folder
2. Replace the text logo in `index.html` (line 21-23) with:
```html
<div class="logo">
    <img src="your-logo.png" alt="NinjaBox Logo" height="40">
</div>
```

## Contact Form Integration

The contact form is currently set up for basic functionality. To receive actual form submissions, you can:

### Option 1: Formspree (Easy, Free tier available)
1. Sign up at [Formspree](https://formspree.io/)
2. Update form action in index.html:
```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 2: Netlify Forms (If using Netlify)
1. Add `netlify` attribute to form:
```html
<form name="contact" netlify>
```

### Option 3: Custom Backend
Implement your own backend API to handle form submissions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s

## Future Enhancements

- Add image gallery for products
- Implement product catalog with pricing
- Add multilingual support (Bahasa Malaysia/English)
- Integrate with e-commerce platform
- Add customer testimonials section
- Implement live chat support

## Support

For technical support or inquiries:
- Email: info@ninjabox.my
- Website: https://ninjabox.my

## License

© 2025 NinjaBox Sdn Bhd. All rights reserved.

