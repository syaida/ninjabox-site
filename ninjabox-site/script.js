// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(-5px, 6px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(-5px, -6px)' : 'none';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });

    // Add shadow to navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Here you would typically send the data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Product Inquiry Modal
function showInquiry(productName) {
    const modal = document.getElementById('inquiryModal');
    const modalProduct = document.getElementById('modalProduct');
    modalProduct.textContent = productName;
    modal.style.display = 'block';
    
    // Pre-fill the product in contact form
    const productSelect = document.getElementById('product');
    productSelect.value = productName;
}

function closeModal() {
    const modal = document.getElementById('inquiryModal');
    modal.style.display = 'none';
}

function scrollToContact() {
    closeModal();
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('inquiryModal');
    if (e.target === modal) {
        closeModal();
    }
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, feature items, and FAQ items
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .info-item, .faq-item, .process-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Catalogue Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Catalogue Search
    const searchInput = document.getElementById('catalogueSearch');
    const catalogueItems = document.querySelectorAll('.catalogue-item');
    const noResults = document.getElementById('noResults');
    const catalogueGrid = document.getElementById('catalogueGrid');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterCatalogueItems(searchTerm);
        });
    }

    // Catalogue Filter Buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            filterCatalogueByCategory(filter);
            
            // Clear search input when filtering by category
            if (searchInput) {
                searchInput.value = '';
            }
        });
    });

    function filterCatalogueItems(searchTerm) {
        let visibleCount = 0;

        catalogueItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('.catalogue-description').textContent.toLowerCase();
            const specs = item.querySelector('.catalogue-specs').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || specs.includes(searchTerm)) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            catalogueGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            catalogueGrid.style.display = 'grid';
            noResults.style.display = 'none';
        }
    }

    function filterCatalogueByCategory(category) {
        let visibleCount = 0;

        catalogueItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            catalogueGrid.style.display = 'none';
            noResults.style.display = 'block';
        } else {
            catalogueGrid.style.display = 'grid';
            noResults.style.display = 'none';
        }
    }
});

// Reset Catalogue
function resetCatalogue() {
    const catalogueItems = document.querySelectorAll('.catalogue-item');
    const searchInput = document.getElementById('catalogueSearch');
    const noResults = document.getElementById('noResults');
    const catalogueGrid = document.getElementById('catalogueGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Show all items
    catalogueItems.forEach(item => {
        item.style.display = 'flex';
    });

    // Clear search
    if (searchInput) {
        searchInput.value = '';
    }

    // Reset filter to "All"
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === 'all') {
            btn.classList.add('active');
        }
    });

    // Hide no results message
    catalogueGrid.style.display = 'grid';
    noResults.style.display = 'none';
}

// Helper function to load logo and add to PDF
function addLogoToPDF(doc, callback) {
    const img = new Image();
    
    img.onload = function() {
        try {
            // Verify image loaded correctly
            if (!img.complete || img.naturalWidth === 0) {
                throw new Error('Image failed to load completely');
            }
            
            console.log('Logo image loaded. Dimensions:', img.naturalWidth, 'x', img.naturalHeight);
            
            // Try method 1: Use image directly without canvas (sometimes works better)
            try {
                const logoWidth = 40;
                const imgWidth = img.naturalWidth || img.width;
                const imgHeight = img.naturalHeight || img.height;
                const logoHeight = (imgHeight / imgWidth) * logoWidth;
                const logoX = (210 - logoWidth) / 2;
                const logoY = 50;
                
                // Try adding image directly to PDF
                doc.addImage(img, 'PNG', logoX, logoY, logoWidth, logoHeight);
                console.log('Logo added directly to PDF');
                callback();
                return;
            } catch (directError) {
                console.log('Direct image method failed, using canvas method...', directError);
            }
            
            // Method 2: Use canvas to ensure color preservation
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas size to match image exactly
            const imgWidth = img.naturalWidth || img.width;
            const imgHeight = img.naturalHeight || img.height;
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            
            // DON'T fill with orange - draw the image as-is to preserve ALL its colors
            // The logo image itself has black background, brown box, orange mask, white text
            // We want to preserve ALL of these colors exactly as they are
            
            // Enable high-quality rendering
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Draw the logo image directly - preserve ALL original colors
            ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
            
            // Convert to PNG to preserve ALL colors (brown, orange, black, white)
            const imgData = canvas.toDataURL('image/png', 1.0);
            
            // Calculate logo dimensions
            const logoWidth = 40;
            const logoHeight = (imgHeight / imgWidth) * logoWidth;
            const logoX = (210 - logoWidth) / 2; // Center horizontally
            const logoY = 50; // Position from top
            
            // Add to PDF using PNG format
            doc.addImage(imgData, 'PNG', logoX, logoY, logoWidth, logoHeight);
            
            console.log('Logo successfully added to PDF with all colors preserved');
            callback();
        } catch (error) {
            console.error('Error adding logo to PDF:', error);
            callback(); // Continue without logo
        }
    };
    
    img.onerror = function(event) {
        console.error('Failed to load logo: LOGO-NINJABOX1.png', event);
        console.error('Please ensure the file exists in the same directory as index.html');
        callback(); // Continue without logo
    };
    
    // Set image source - ensure it loads
    img.src = 'LOGO-NINJABOX1.png';
}

// Download Catalogue PDF
function downloadCatalogue() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set colors
    const primaryColor = [26, 26, 26]; // Black
    const accentColor = [255, 107, 53]; // Orange
    
    let yPosition = 20;
    
    // Cover Page
    doc.setFillColor(...accentColor);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Add logo first, then continue with text
    addLogoToPDF(doc, function() {
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(36);
        doc.setFont('helvetica', 'bold');
        doc.text('NINJABOX', 105, 100, { align: 'center' });
        
        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        doc.text('Product Catalogue', 105, 120, { align: 'center' });
        
        doc.setFontSize(14);
        doc.text('Premium Packaging Solutions', 105, 140, { align: 'center' });
        
        continueDownloadCatalogue(doc, primaryColor, accentColor);
    });
}

// Continue PDF generation after logo is added
function continueDownloadCatalogue(doc, primaryColor, accentColor) {
    let yPosition = 20;
    
    // Contact Info
    doc.setFontSize(11);
    doc.text('Email: enquiry@ninjabox.my', 105, 200, { align: 'center' });
    doc.text('Phone: 017-228 9028', 105, 210, { align: 'center' });
    doc.text('Address: Lot 2210, Jalan Kasawari, Kampung Batu 9 Kebun Baru', 105, 220, { align: 'center' });
    doc.text('42500 Telok Panglima Garang, Selangor', 105, 230, { align: 'center' });
    
    // Add new page
    doc.addPage();
    yPosition = 20;
    
    // Table of Contents
    doc.setTextColor(...primaryColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Table of Contents', 20, yPosition);
    
    yPosition += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('1. Pizza Box', 25, yPosition);
    yPosition += 8;
    doc.text('2. Mailer Box', 25, yPosition);
    yPosition += 8;
    doc.text('3. RSC Box', 25, yPosition);
    yPosition += 8;
    doc.text('4. Document Box', 25, yPosition);
    
    // PIZZA BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PIZZA BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Pizza Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    // Pizza Box Products
    const pizzaBoxes = [
        { size: 'PZ01 (8")', dim: '20.8cm x 20.8cm x 3.8cm', material: 'B-Flute Corrugated' },
        { size: 'PZ02 (10")', dim: '26cm x 26cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'PZ03 (12")', dim: '31cm x 31cm x 4.6cm', material: 'B-Flute Corrugated' },
        { size: 'PZ04 (7")', dim: '18.3cm x 18.3cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'PZ05 (9")', dim: '23.5cm x 23.5cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'PZ06 (11")', dim: '29cm x 29cm x 4.6cm', material: 'B-Flute Corrugated' }
    ];
    
    pizzaBoxes.forEach((item, index) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
        }
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // MAILER BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('MAILER BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    
    // Mailer Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    const mailerBoxes = [
        { size: 'MBA', dim: '24cm x 19cm x 6.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBB', dim: '33cm x 24cm x 8.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBC', dim: '62cm x 51cm x 13.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBD', dim: '23cm x 15cm x 5.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBE', dim: '25.5cm x 21cm x 6.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBF', dim: '29.4cm x 21.2cm x 5.8cm', material: 'B-Flute Corrugated' },
        { size: 'MBG', dim: '29cm x 24.5cm x 16cm', material: 'B-Flute Corrugated' },
        { size: 'MBH', dim: '46cm x 30cm x 14cm', material: 'B-Flute Corrugated' },
        { size: 'NM1', dim: '15cm x 15cm x 5cm', material: 'B-Flute Corrugated' },
        { size: 'NM2', dim: '18cm x 10cm x 6cm', material: 'B-Flute Corrugated' },
        { size: 'NM3', dim: '20cm x 14cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'NM4', dim: '25cm x 25cm x 6cm', material: 'B-Flute Corrugated' },
        { size: 'NM5', dim: '25cm x 20cm x 7cm', material: 'B-Flute Corrugated' },
        { size: 'NM6', dim: '27cm x 17cm x 5cm', material: 'B-Flute Corrugated' },
        { size: 'NM7', dim: '30cm x 22cm x 5cm', material: 'B-Flute Corrugated' },
        { size: 'NM8', dim: '30cm x 30cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM9', dim: '32cm x 24cm x 6cm', material: 'B-Flute Corrugated' },
        { size: 'NM10', dim: '33cm x 25cm x 7cm', material: 'B-Flute Corrugated' },
        { size: 'NM11', dim: '35cm x 25cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM12', dim: '35cm x 30cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM13', dim: '38cm x 28cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM14', dim: '40cm x 30cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'NM15', dim: '42cm x 32cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'NM16', dim: '45cm x 35cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'NM17', dim: '29cm x 12cm x 11cm', material: 'B-Flute Corrugated' },
        { size: 'NM18', dim: '27.5cm x 20cm x 10.5cm', material: 'B-Flute Corrugated' },
        { size: 'NM19', dim: '26.5cm x 21cm x 12cm', material: 'B-Flute Corrugated' },
        { size: 'NM20', dim: '33.2cm x 23.4cm x 11.3cm', material: 'B-Flute Corrugated' },
        { size: 'NM21', dim: '45.2cm x 33.8cm x 7cm', material: 'B-Flute Corrugated' }
    ];
    
    mailerBoxes.forEach((item) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
            // Re-add table header on new page
            doc.setFillColor(240, 240, 240);
            doc.rect(20, yPosition - 5, 170, 7, 'F');
            doc.setFont('helvetica', 'bold');
            doc.text('Size', 25, yPosition);
            doc.text('Dimensions', 70, yPosition);
            doc.text('Material', 130, yPosition);
            yPosition += 10;
            doc.setFont('helvetica', 'normal');
        }
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // RSC BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('RSC BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    
    // RSC Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    const rscBoxes = [
        { size: 'R01', dim: '15cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R02', dim: '15cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R03', dim: '20cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R04', dim: '20cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R05', dim: '25cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R06', dim: '25cm x 25cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R07', dim: '30cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R08', dim: '30cm x 30cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R09', dim: '25cm x 20cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R10', dim: '30cm x 20cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R11', dim: '30cm x 30cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R12', dim: '35cm x 25cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R13', dim: '40cm x 30cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R14', dim: '40cm x 40cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R15', dim: '15cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R16', dim: '15cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R17', dim: '20cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R18', dim: '20cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R19', dim: '25cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R20', dim: '25cm x 25cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R21', dim: '30cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R22', dim: '30cm x 30cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R23', dim: '20cm x 15cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R24', dim: '25cm x 15cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R25', dim: '25cm x 25cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R26', dim: '30cm x 20cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R27', dim: '30cm x 30cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R28', dim: '35cm x 25cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R29', dim: '35cm x 35cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R30', dim: '40cm x 30cm x 15cm', material: 'B-Flute Corrugated' }
    ];
    
    rscBoxes.forEach((item) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
            // Re-add table header on new page
            doc.setFillColor(240, 240, 240);
            doc.rect(20, yPosition - 5, 170, 7, 'F');
            doc.setFont('helvetica', 'bold');
            doc.text('Size', 25, yPosition);
            doc.text('Dimensions', 70, yPosition);
            doc.text('Material', 130, yPosition);
            yPosition += 10;
            doc.setFont('helvetica', 'normal');
        }
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // DOCUMENT BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('DOCUMENT BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    
    // Document Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    const documentBoxes = [
        { size: 'DB1', dim: '35cm x 25cm x 26cm', material: 'B-Flute Corrugated' },
        { size: 'DB2', dim: '41cm x 32cm x 29.5cm', material: 'B-Flute Corrugated' },
        { size: 'DB3', dim: '45.7cm x 36.8cm x 30.5cm', material: 'B-Flute Corrugated' }
    ];
    
    documentBoxes.forEach((item) => {
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // Contact Page
    doc.addPage();
    yPosition = 50;
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Contact Us', 105, yPosition, { align: 'center' });
    
    yPosition += 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Email: enquiry@ninjabox.my', 105, yPosition, { align: 'center' });
    yPosition += 10;
    doc.text('Phone: 017-228 9028', 105, yPosition, { align: 'center' });
    yPosition += 10;
    doc.text('Address:', 105, yPosition, { align: 'center' });
    yPosition += 10;
    doc.setFontSize(10);
    doc.text('Lot 2210, Jalan Kasawari, Kampung Batu 9 Kebun Baru', 105, yPosition, { align: 'center' });
    yPosition += 8;
    doc.text('42500 Telok Panglima Garang, Selangor', 105, yPosition, { align: 'center' });
    
    yPosition += 20;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Custom Size & Printing Available!', 105, yPosition, { align: 'center' });
    
    // Save PDF
    doc.save('NinjaBox-Product-Catalogue.pdf');
    
    // Show success message
    showNotification('📥 Catalogue PDF downloaded successfully!');
}

// Show notification function
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('pdfNotification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'pdfNotification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

// Open Catalogue Request Form
function openCatalogueForm() {
    console.log('Opening catalogue form...');
    const modal = document.getElementById('catalogueModal');
    if (!modal) {
        console.error('Catalogue modal not found!');
        return;
    }
    // Show modal with flexbox display
    modal.style.display = 'flex';
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    console.log('Modal opened successfully');
}

// Close Catalogue Modal
function closeCatalogueModal() {
    const modal = document.getElementById('catalogueModal');
    modal.style.display = 'none';
    // Restore body scroll
    document.body.style.overflow = '';
    // Reset form
    document.getElementById('catalogueForm').reset();
}

// Using Web3Forms for free email with attachments
// Get your access key from: https://web3forms.com/
const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // Replace with your Web3Forms access key

// Handle Catalogue Form Submission
async function handleCatalogueForm(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        interest: formData.get('interest'),
        message: formData.get('message')
    };
    
    // Show loading state
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Processing...';
    
    try {
        // Step 1: Download PDF immediately (must happen in user interaction context)
        // Don't wait for Firebase - download first, save in background
        let downloadSuccess = false;
        try {
            await downloadCataloguePDF();
            downloadSuccess = true;
            submitBtn.textContent = '✅ Downloaded!';
            showNotification('✅ Catalogue PDF downloaded! Saving your information...');
        } catch (downloadError) {
            console.error('PDF download error:', downloadError);
            // Fallback: Try direct link download
            try {
                const link = document.createElement('a');
                link.href = '2025 CATALOGUE NINJABOX.pdf';
                link.download = '2025_CATALOGUE_NINJABOX.pdf';
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                downloadSuccess = true;
                submitBtn.textContent = '✅ Downloading!';
                showNotification('✅ PDF download started! Saving your information...');
            } catch (fallbackError) {
                // Last resort: open in new tab
                window.open('2025 CATALOGUE NINJABOX.pdf', '_blank');
                submitBtn.textContent = '✅ Opened!';
                showNotification('✅ PDF opened! Saving your information...');
            }
        }
        
        // Step 2: Save lead to Firebase database (in background)
        saveLeadToDatabase(data).then(() => {
            console.log('✅ Lead saved to database');
            if (downloadSuccess) {
                showNotification('✅ Catalogue PDF downloaded!');
            } else {
                showNotification('✅ Lead saved successfully!');
            }
        }).catch(err => {
            console.error('Failed to save lead:', err);
            console.error('Full error:', err);
            
            // Show specific error message
            let errorMsg = '⚠️ PDF downloaded, but failed to save lead.';
            if (err.message && err.message.includes('Permission denied')) {
                errorMsg = '⚠️ PDF downloaded, but failed to save lead. Please check Firestore rules.';
            } else if (err.message && err.message.includes('Firestore unavailable')) {
                errorMsg = '⚠️ PDF downloaded, but Firestore is unavailable. Please check Firebase setup.';
            }
            
            showNotification(errorMsg);
        });
        
        // Step 3: Close modal after delay
        setTimeout(() => {
            closeCatalogueModal();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 2000);
        
    } catch (error) {
        console.error('Error processing catalogue request:', error);
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        showNotification('⚠️ Error processing request. Please try again.');
    }
}

// Save lead to Firebase Firestore database
async function saveLeadToDatabase(leadData) {
    try {
        // Check if Firebase is available
        if (typeof firebase === 'undefined' || !firebase.apps.length) {
            console.warn('Firebase not initialized. Lead not saved to database.');
            throw new Error('Firebase not initialized');
        }
        
        // Initialize Firestore
        const db = firebase.firestore();
        
        // Prepare lead document with timestamp
        const leadDocument = {
            name: leadData.name || '',
            email: leadData.email || '',
            phone: leadData.phone || '',
            company: leadData.company || '',
            interest: leadData.interest || '',
            message: leadData.message || '',
            source: 'Catalogue Request',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            date: new Date().toISOString(),
            status: 'new'
        };
        
        console.log('Attempting to save lead:', leadDocument);
        
        // Save to 'leads' collection in Firestore
        const docRef = await db.collection('leads').add(leadDocument);
        
        console.log('✅ Lead saved to Firebase database');
        console.log('Document ID:', docRef.id);
        return true;
    } catch (error) {
        console.error('❌ Error saving lead to database:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        
        // Show specific error messages
        if (error.code === 'permission-denied') {
            console.error('⚠️ Permission denied! Check Firestore rules allow creating leads.');
            throw new Error('Permission denied. Please check Firestore security rules.');
        } else if (error.code === 'unavailable') {
            console.error('⚠️ Firestore unavailable. Check if Firestore is enabled.');
            throw new Error('Firestore unavailable. Please check Firebase setup.');
        }
        
        // Re-throw error so it can be handled by caller
        throw error;
    }
}

// Download catalogue PDF automatically
async function downloadCataloguePDF() {
    try {
        // Try fetching the PDF file - handle spaces in filename
        const pdfFileName = '2025 CATALOGUE NINJABOX.pdf';
        let response;
        
        // Try direct fetch first
        try {
            response = await fetch(pdfFileName);
            if (!response.ok) {
                throw new Error('Direct fetch failed');
            }
        } catch (e) {
            // If direct fetch fails, try with URL encoding
            console.log('Direct fetch failed, trying URL encoding...');
            const encodedFileName = encodeURIComponent(pdfFileName);
            response = await fetch(encodedFileName);
            
            if (!response.ok) {
                // Try with spaces replaced with %20
                const urlEncoded = pdfFileName.replace(/ /g, '%20');
                response = await fetch(urlEncoded);
            }
        }
        
        if (!response || !response.ok) {
            throw new Error(`Catalogue PDF not found. Status: ${response?.status || 'unknown'}`);
        }
        
        // Get PDF as blob
        const pdfBlob = await response.blob();
        
        if (!pdfBlob || pdfBlob.size === 0) {
            throw new Error('PDF file is empty or invalid');
        }
        
        console.log(`PDF blob size: ${pdfBlob.size} bytes`);
        
        // Create download link with better compatibility
        const url = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '2025_CATALOGUE_NINJABOX.pdf';
        link.style.display = 'none'; // Hide the link
        link.setAttribute('download', '2025_CATALOGUE_NINJABOX.pdf'); // Ensure download attribute
        
        // Add to DOM
        document.body.appendChild(link);
        
        // Trigger download - use both methods for better compatibility
        try {
            link.click();
        } catch (clickError) {
            // Fallback: try direct download
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = url;
            document.body.appendChild(iframe);
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        }
        
        // Clean up after a delay to ensure download starts
        setTimeout(() => {
            if (document.body.contains(link)) {
                document.body.removeChild(link);
            }
            window.URL.revokeObjectURL(url);
        }, 200);
        
        console.log('✅ PDF download triggered successfully');
        return true;
    } catch (error) {
        console.error('Error downloading PDF:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        
        // Show user-friendly error
        showNotification('⚠️ PDF download failed. Please check if the file exists.');
        throw error;
    }
}

// Send catalogue email with PDF attachment
function sendCatalogueEmail(userData, pdfBlob, submitBtn, originalText) {
    // Create FormData for Web3Forms
    const formData = new FormData();
    const fileName = '2025_CATALOGUE_NINJABOX.pdf';
    
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', `NinjaBox Product Catalogue - Requested by ${userData.name}`);
    formData.append('from_name', 'NinjaBox');
    formData.append('email', userData.email);
    formData.append('name', userData.name);
    formData.append('message', `
Thank you for requesting our product catalogue!

Name: ${userData.name}
Email: ${userData.email}
Phone: ${userData.phone || 'Not provided'}
Company: ${userData.company || 'Not provided'}
Product Interest: ${userData.interest || 'All Products'}
${userData.message ? `Message: ${userData.message}` : ''}

Please find attached our complete NinjaBox Product Catalogue PDF.

Best regards,
NinjaBox Team
    `);
    
    formData.append('attachment', pdfBlob, fileName);
    
    // Send email via Web3Forms
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Email sent successfully!', data);
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Close modal
            closeCatalogueModal();
            
            // Show success message
            showNotification('✅ Catalogue PDF sent to your email! Please check your inbox (and spam folder).');
        } else {
            throw new Error(data.message || 'Email sending failed');
        }
    })
    .catch(error => {
        console.error('Email sending failed:', error);
        
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Show error message
        showNotification('⚠️ Email failed. Please check your email settings or contact us directly.');
    });
}

// Continue PDF generation after logo is added
function continueGenerateAndSendCataloguePDF(doc, userData, submitBtn, originalText, primaryColor, accentColor) {
    let yPosition = 20;
    
    // Add new page
    doc.addPage();
    yPosition = 20;
    
    // Table of Contents
    doc.setTextColor(...primaryColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Table of Contents', 20, yPosition);
    
    yPosition += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('1. Pizza Box', 25, yPosition);
    yPosition += 8;
    doc.text('2. Mailer Box', 25, yPosition);
    yPosition += 8;
    doc.text('3. RSC Box', 25, yPosition);
    yPosition += 8;
    doc.text('4. Document Box', 25, yPosition);
    
    // PIZZA BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PIZZA BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Pizza Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    // Pizza Box Products
    const pizzaBoxes = [
        { size: 'PZ01 (8")', dim: '20.8cm x 20.8cm x 3.8cm', material: 'B-Flute Corrugated' },
        { size: 'PZ02 (10")', dim: '26cm x 26cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'PZ03 (12")', dim: '31cm x 31cm x 4.6cm', material: 'B-Flute Corrugated' },
        { size: 'PZ04 (7")', dim: '18.3cm x 18.3cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'PZ05 (9")', dim: '23.5cm x 23.5cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'PZ06 (11")', dim: '29cm x 29cm x 4.6cm', material: 'B-Flute Corrugated' }
    ];
    
    pizzaBoxes.forEach((item, index) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
        }
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // MAILER BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('MAILER BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    
    // Mailer Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    const mailerBoxes = [
        { size: 'MBA', dim: '24cm x 19cm x 6.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBB', dim: '33cm x 24cm x 8.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBC', dim: '62cm x 51cm x 13.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBD', dim: '23cm x 15cm x 5.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBE', dim: '25.5cm x 21cm x 6.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBF', dim: '29.4cm x 21.2cm x 5.8cm', material: 'B-Flute Corrugated' },
        { size: 'MBG', dim: '29cm x 24.5cm x 16cm', material: 'B-Flute Corrugated' },
        { size: 'MBH', dim: '46cm x 30cm x 14cm', material: 'B-Flute Corrugated' },
        { size: 'NM1', dim: '15cm x 15cm x 5cm', material: 'B-Flute Corrugated' },
        { size: 'NM2', dim: '18cm x 10cm x 6cm', material: 'B-Flute Corrugated' },
        { size: 'NM3', dim: '20cm x 14cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'NM4', dim: '25cm x 25cm x 6cm', material: 'B-Flute Corrugated' },
        { size: 'NM5', dim: '25cm x 20cm x 7cm', material: 'B-Flute Corrugated' },
        { size: 'NM6', dim: '27cm x 17cm x 5cm', material: 'B-Flute Corrugated' },
        { size: 'NM7', dim: '30cm x 22cm x 5cm', material: 'B-Flute Corrugated' },
        { size: 'NM8', dim: '30cm x 30cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM9', dim: '32cm x 24cm x 6cm', material: 'B-Flute Corrugated' },
        { size: 'NM10', dim: '33cm x 25cm x 7cm', material: 'B-Flute Corrugated' },
        { size: 'NM11', dim: '35cm x 25cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM12', dim: '35cm x 30cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM13', dim: '38cm x 28cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM14', dim: '40cm x 30cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'NM15', dim: '42cm x 32cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'NM16', dim: '45cm x 35cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'NM17', dim: '29cm x 12cm x 11cm', material: 'B-Flute Corrugated' },
        { size: 'NM18', dim: '27.5cm x 20cm x 10.5cm', material: 'B-Flute Corrugated' },
        { size: 'NM19', dim: '26.5cm x 21cm x 12cm', material: 'B-Flute Corrugated' },
        { size: 'NM20', dim: '33.2cm x 23.4cm x 11.3cm', material: 'B-Flute Corrugated' },
        { size: 'NM21', dim: '45.2cm x 33.8cm x 7cm', material: 'B-Flute Corrugated' }
    ];
    
    mailerBoxes.forEach((item) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
            // Re-add table header on new page
            doc.setFillColor(240, 240, 240);
            doc.rect(20, yPosition - 5, 170, 7, 'F');
            doc.setFont('helvetica', 'bold');
            doc.text('Size', 25, yPosition);
            doc.text('Dimensions', 70, yPosition);
            doc.text('Material', 130, yPosition);
            yPosition += 10;
            doc.setFont('helvetica', 'normal');
        }
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // RSC BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('RSC BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    
    // RSC Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    const rscBoxes = [
        { size: 'R01', dim: '15cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R02', dim: '15cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R03', dim: '20cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R04', dim: '20cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R05', dim: '25cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R06', dim: '25cm x 25cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R07', dim: '30cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R08', dim: '30cm x 30cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R09', dim: '25cm x 20cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R10', dim: '30cm x 20cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R11', dim: '30cm x 30cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R12', dim: '35cm x 25cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R13', dim: '40cm x 30cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R14', dim: '40cm x 40cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R15', dim: '15cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R16', dim: '15cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R17', dim: '20cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R18', dim: '20cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R19', dim: '25cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R20', dim: '25cm x 25cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R21', dim: '30cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R22', dim: '30cm x 30cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R23', dim: '20cm x 15cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R24', dim: '25cm x 15cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R25', dim: '25cm x 25cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R26', dim: '30cm x 20cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R27', dim: '30cm x 30cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R28', dim: '35cm x 25cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R29', dim: '35cm x 35cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R30', dim: '40cm x 30cm x 15cm', material: 'B-Flute Corrugated' }
    ];
    
    rscBoxes.forEach((item) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
            // Re-add table header on new page
            doc.setFillColor(240, 240, 240);
            doc.rect(20, yPosition - 5, 170, 7, 'F');
            doc.setFont('helvetica', 'bold');
            doc.text('Size', 25, yPosition);
            doc.text('Dimensions', 70, yPosition);
            doc.text('Material', 130, yPosition);
            yPosition += 10;
            doc.setFont('helvetica', 'normal');
        }
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // DOCUMENT BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('DOCUMENT BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    
    // Document Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    const documentBoxes = [
        { size: 'DB1', dim: '35cm x 25cm x 26cm', material: 'B-Flute Corrugated' },
        { size: 'DB2', dim: '41cm x 32cm x 29.5cm', material: 'B-Flute Corrugated' },
        { size: 'DB3', dim: '45.7cm x 36.8cm x 30.5cm', material: 'B-Flute Corrugated' }
    ];
    
    documentBoxes.forEach((item) => {
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // Contact Page
    doc.addPage();
    yPosition = 50;
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Contact Us', 105, yPosition, { align: 'center' });
    
    yPosition += 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Email: enquiry@ninjabox.my', 105, yPosition, { align: 'center' });
    yPosition += 10;
    doc.text('Phone: 017-228 9028', 105, yPosition, { align: 'center' });
    yPosition += 10;
    doc.text('Address:', 105, yPosition, { align: 'center' });
    yPosition += 10;
    doc.setFontSize(10);
    doc.text('Lot 2210, Jalan Kasawari, Kampung Batu 9 Kebun Baru', 105, yPosition, { align: 'center' });
    yPosition += 8;
    doc.text('42500 Telok Panglima Garang, Selangor', 105, yPosition, { align: 'center' });
    
    yPosition += 20;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Custom Size & Printing Available!', 105, yPosition, { align: 'center' });
    
    // Convert PDF to blob for attachment
    const pdfBlob = doc.output('blob');
    
    // Send email with PDF attachment
    sendCatalogueEmail(userData, pdfBlob, submitBtn, originalText);
}

// Generate PDF with personalized information (for direct download - kept as backup)
function generateCataloguePDF(userData) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set colors
    const primaryColor = [26, 26, 26]; // Black
    const accentColor = [255, 107, 53]; // Orange
    
    // Cover Page
    doc.setFillColor(...accentColor);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Add logo first, then continue with text
    addLogoToPDF(doc, function() {
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(36);
        doc.setFont('helvetica', 'bold');
        doc.text('NINJABOX', 105, 80, { align: 'center' });
        
        doc.setFontSize(20);
        doc.setFont('helvetica', 'normal');
        doc.text('Product Catalogue', 105, 100, { align: 'center' });
        
        doc.setFontSize(14);
        doc.text('Premium Packaging Solutions', 105, 115, { align: 'center' });
        
        // Personalized message
        if (userData.name) {
            doc.setFontSize(12);
            doc.text(`Prepared for: ${userData.name}`, 105, 140, { align: 'center' });
            if (userData.company) {
                doc.text(`Company: ${userData.company}`, 105, 150, { align: 'center' });
            }
        }
        
        // Contact Info
        doc.setFontSize(11);
        doc.text('Email: enquiry@ninjabox.my', 105, 200, { align: 'center' });
        doc.text('Phone: 017-228 9028', 105, 210, { align: 'center' });
        doc.text('Address: Lot 2210, Jalan Kasawari, Kampung Batu 9 Kebun Baru', 105, 220, { align: 'center' });
        doc.text('42500 Telok Panglima Garang, Selangor', 105, 230, { align: 'center' });
        
        continueGenerateCataloguePDF(doc, userData, primaryColor, accentColor);
    });
}

// Continue PDF generation after logo is added
function continueGenerateCataloguePDF(doc, userData, primaryColor, accentColor) {
    let yPosition = 20;
    
    // Add new page
    doc.addPage();
    yPosition = 20;
    
    // Table of Contents
    doc.setTextColor(...primaryColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Table of Contents', 20, yPosition);
    
    yPosition += 15;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('1. Pizza Box', 25, yPosition);
    yPosition += 8;
    doc.text('2. Mailer Box', 25, yPosition);
    yPosition += 8;
    doc.text('3. RSC Box', 25, yPosition);
    yPosition += 8;
    doc.text('4. Document Box', 25, yPosition);
    
    // PIZZA BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PIZZA BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    // Pizza Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    // Pizza Box Products
    const pizzaBoxes = [
        { size: 'PZ01 (8")', dim: '20.8cm x 20.8cm x 3.8cm', material: 'B-Flute Corrugated' },
        { size: 'PZ02 (10")', dim: '26cm x 26cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'PZ03 (12")', dim: '31cm x 31cm x 4.6cm', material: 'B-Flute Corrugated' },
        { size: 'PZ04 (7")', dim: '18.3cm x 18.3cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'PZ05 (9")', dim: '23.5cm x 23.5cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'PZ06 (11")', dim: '29cm x 29cm x 4.6cm', material: 'B-Flute Corrugated' }
    ];
    
    pizzaBoxes.forEach((item, index) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
        }
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // MAILER BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('MAILER BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    
    // Mailer Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    const mailerBoxes = [
        { size: 'MBA', dim: '24cm x 19cm x 6.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBB', dim: '33cm x 24cm x 8.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBC', dim: '62cm x 51cm x 13.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBD', dim: '23cm x 15cm x 5.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBE', dim: '25.5cm x 21cm x 6.5cm', material: 'B-Flute Corrugated' },
        { size: 'MBF', dim: '29.4cm x 21.2cm x 5.8cm', material: 'B-Flute Corrugated' },
        { size: 'MBG', dim: '29cm x 24.5cm x 16cm', material: 'B-Flute Corrugated' },
        { size: 'MBH', dim: '46cm x 30cm x 14cm', material: 'B-Flute Corrugated' },
        { size: 'NM1', dim: '15cm x 15cm x 5cm', material: 'B-Flute Corrugated' },
        { size: 'NM2', dim: '18cm x 10cm x 6cm', material: 'B-Flute Corrugated' },
        { size: 'NM3', dim: '20cm x 14cm x 4cm', material: 'B-Flute Corrugated' },
        { size: 'NM4', dim: '25cm x 25cm x 6cm', material: 'B-Flute Corrugated' },
        { size: 'NM5', dim: '25cm x 20cm x 7cm', material: 'B-Flute Corrugated' },
        { size: 'NM6', dim: '27cm x 17cm x 5cm', material: 'B-Flute Corrugated' },
        { size: 'NM7', dim: '30cm x 22cm x 5cm', material: 'B-Flute Corrugated' },
        { size: 'NM8', dim: '30cm x 30cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM9', dim: '32cm x 24cm x 6cm', material: 'B-Flute Corrugated' },
        { size: 'NM10', dim: '33cm x 25cm x 7cm', material: 'B-Flute Corrugated' },
        { size: 'NM11', dim: '35cm x 25cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM12', dim: '35cm x 30cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM13', dim: '38cm x 28cm x 8cm', material: 'B-Flute Corrugated' },
        { size: 'NM14', dim: '40cm x 30cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'NM15', dim: '42cm x 32cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'NM16', dim: '45cm x 35cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'NM17', dim: '29cm x 12cm x 11cm', material: 'B-Flute Corrugated' },
        { size: 'NM18', dim: '27.5cm x 20cm x 10.5cm', material: 'B-Flute Corrugated' },
        { size: 'NM19', dim: '26.5cm x 21cm x 12cm', material: 'B-Flute Corrugated' },
        { size: 'NM20', dim: '33.2cm x 23.4cm x 11.3cm', material: 'B-Flute Corrugated' },
        { size: 'NM21', dim: '45.2cm x 33.8cm x 7cm', material: 'B-Flute Corrugated' }
    ];
    
    mailerBoxes.forEach((item) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
            // Re-add table header on new page
            doc.setFillColor(240, 240, 240);
            doc.rect(20, yPosition - 5, 170, 7, 'F');
            doc.setFont('helvetica', 'bold');
            doc.text('Size', 25, yPosition);
            doc.text('Dimensions', 70, yPosition);
            doc.text('Material', 130, yPosition);
            yPosition += 10;
            doc.setFont('helvetica', 'normal');
        }
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // RSC BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('RSC BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    
    // RSC Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    const rscBoxes = [
        { size: 'R01', dim: '15cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R02', dim: '15cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R03', dim: '20cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R04', dim: '20cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R05', dim: '25cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R06', dim: '25cm x 25cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R07', dim: '30cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R08', dim: '30cm x 30cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R09', dim: '25cm x 20cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R10', dim: '30cm x 20cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R11', dim: '30cm x 30cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R12', dim: '35cm x 25cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R13', dim: '40cm x 30cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R14', dim: '40cm x 40cm x 20cm', material: 'B-Flute Corrugated' },
        { size: 'R15', dim: '15cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R16', dim: '15cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R17', dim: '20cm x 10cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R18', dim: '20cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R19', dim: '25cm x 15cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R20', dim: '25cm x 25cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R21', dim: '30cm x 20cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R22', dim: '30cm x 30cm x 10cm', material: 'B-Flute Corrugated' },
        { size: 'R23', dim: '20cm x 15cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R24', dim: '25cm x 15cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R25', dim: '25cm x 25cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R26', dim: '30cm x 20cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R27', dim: '30cm x 30cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R28', dim: '35cm x 25cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R29', dim: '35cm x 35cm x 15cm', material: 'B-Flute Corrugated' },
        { size: 'R30', dim: '40cm x 30cm x 15cm', material: 'B-Flute Corrugated' }
    ];
    
    rscBoxes.forEach((item) => {
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
            // Re-add table header on new page
            doc.setFillColor(240, 240, 240);
            doc.rect(20, yPosition - 5, 170, 7, 'F');
            doc.setFont('helvetica', 'bold');
            doc.text('Size', 25, yPosition);
            doc.text('Dimensions', 70, yPosition);
            doc.text('Material', 130, yPosition);
            yPosition += 10;
            doc.setFont('helvetica', 'normal');
        }
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // DOCUMENT BOX SECTION
    doc.addPage();
    yPosition = 20;
    
    doc.setFillColor(...accentColor);
    doc.rect(20, yPosition - 5, 170, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('DOCUMENT BOX', 25, yPosition);
    
    yPosition += 15;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(10);
    
    // Document Box Table Header
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPosition - 5, 170, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Size', 25, yPosition);
    doc.text('Dimensions', 70, yPosition);
    doc.text('Material', 130, yPosition);
    
    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    
    const documentBoxes = [
        { size: 'DB1', dim: '35cm x 25cm x 26cm', material: 'B-Flute Corrugated' },
        { size: 'DB2', dim: '41cm x 32cm x 29.5cm', material: 'B-Flute Corrugated' },
        { size: 'DB3', dim: '45.7cm x 36.8cm x 30.5cm', material: 'B-Flute Corrugated' }
    ];
    
    documentBoxes.forEach((item) => {
        doc.text(item.size, 25, yPosition);
        doc.text(item.dim, 70, yPosition);
        doc.text(item.material, 130, yPosition);
        yPosition += 8;
    });
    
    // Contact Page
    doc.addPage();
    yPosition = 50;
    
    doc.setTextColor(...primaryColor);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Contact Us', 105, yPosition, { align: 'center' });
    
    yPosition += 20;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Email: enquiry@ninjabox.my', 105, yPosition, { align: 'center' });
    yPosition += 10;
    doc.text('Phone: 017-228 9028', 105, yPosition, { align: 'center' });
    yPosition += 10;
    doc.text('Address:', 105, yPosition, { align: 'center' });
    yPosition += 10;
    doc.setFontSize(10);
    doc.text('Lot 2210, Jalan Kasawari, Kampung Batu 9 Kebun Baru', 105, yPosition, { align: 'center' });
    yPosition += 8;
    doc.text('42500 Telok Panglima Garang, Selangor', 105, yPosition, { align: 'center' });
    
    yPosition += 20;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Custom Size & Printing Available!', 105, yPosition, { align: 'center' });
    
    // Save PDF with personalized filename
    const fileName = userData.name 
        ? `NinjaBox-Catalogue-${userData.name.replace(/\s+/g, '-')}.pdf`
        : 'NinjaBox-Product-Catalogue.pdf';
    doc.save(fileName);
}

// Modal will only close when clicking the X button, not when clicking outside
// This prevents accidental closing when user clicks outside the form

// Toggle Expandable Catalogue Category
function toggleCategory(element) {
    const category = element.closest('.catalogue-category');
    const variants = category.querySelector('.category-variants');
    const expandIcon = element.querySelector('.expand-icon span');
    const allCategories = document.querySelectorAll('.catalogue-category');
    
    // Close all other categories
    allCategories.forEach(cat => {
        if (cat !== category && cat.classList.contains('active')) {
            cat.classList.remove('active');
            const otherVariants = cat.querySelector('.category-variants');
            if (otherVariants) {
                otherVariants.style.maxHeight = null;
            }
            const otherIcon = cat.querySelector('.expand-icon span');
            if (otherIcon) {
                otherIcon.textContent = '+';
            }
        }
    });
    
    // Toggle current category
    category.classList.toggle('active');
    if (category.classList.contains('active')) {
        // Set max-height to actual scroll height to show all content
        if (variants) {
            variants.style.maxHeight = variants.scrollHeight + "px";
        }
        if (expandIcon) {
            expandIcon.textContent = '×';
        }
    } else {
        if (variants) {
            variants.style.maxHeight = null;
        }
        if (expandIcon) {
            expandIcon.textContent = '+';
        }
    }
}

