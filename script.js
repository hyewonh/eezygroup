document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 15, 28, 0.95)';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid var(--card-border)';
            }
        });
    }

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 15, 28, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 15, 28, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value || 'N/A',
                inquiry: document.getElementById('inquiry').value,
                message: document.getElementById('message').value
            };

            // Create mailto link
            const subject = encodeURIComponent(`New Contact Form Submission - ${formData.inquiry}`);
            const body = encodeURIComponent(
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Company: ${formData.company}\n` +
                `Inquiry Type: ${formData.inquiry}\n\n` +
                `Message:\n${formData.message}`
            );

            const mailtoLink = `mailto:contact@eezygroupinc.com?subject=${subject}&body=${body}`;

            // Open mailto link
            window.location.href = mailtoLink;

            // Show success message
            showSuccessModal();

            // Reset form
            contactForm.reset();
        });
    }
});

// Success Modal
function showSuccessModal() {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-icon">✓</div>
        <h3>Message Sent Successfully</h3>
        <p>We'll get back to you soon.</p>
        <button class="modal-close-btn" onclick="closeSuccessModal()">OK</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Fade in
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

function closeSuccessModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            overlay.remove();
        }, 300);
    }
}

// Close modal when clicking outside
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeSuccessModal();
    }
});
