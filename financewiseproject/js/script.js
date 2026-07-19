// script.js - Global Interactions for FinanceWise

document.addEventListener('DOMContentLoaded', () => {
    // Scroll to Top Button Functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.style.display = 'block';
                scrollTopBtn.style.opacity = '1';
            } else {
                scrollTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 300) {
                        scrollTopBtn.style.display = 'none';
                    }
                }, 300); // match transition
            }
        });

        // Click to scroll to top
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Dynamic Navigation Highlighting (fallback & sanity check)
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
