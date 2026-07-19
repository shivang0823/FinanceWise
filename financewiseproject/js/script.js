// script.js - Global Interactions for FinanceWise

// Global Currency Settings
window.getSelectedCurrency = () => {
    return localStorage.getItem('selectedCurrency') || 'USD';
};

const currencyConfig = {
    USD: { locale: 'en-US', currency: 'USD' },
    EUR: { locale: 'de-DE', currency: 'EUR' },
    GBP: { locale: 'en-GB', currency: 'GBP' },
    INR: { locale: 'en-IN', currency: 'INR' }
};

window.formatCurrencyGlobal = (amount) => {
    const curr = window.getSelectedCurrency();
    const config = currencyConfig[curr] || currencyConfig.USD;
    return new Intl.NumberFormat(config.locale, { style: 'currency', currency: config.currency }).format(amount);
};

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

    // Dynamic Navigation Highlighting
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

    // Initialize Currency Selector
    const currencySelector = document.getElementById('currencySelector');
    if (currencySelector) {
        currencySelector.value = window.getSelectedCurrency();
        currencySelector.addEventListener('change', (e) => {
            localStorage.setItem('selectedCurrency', e.target.value);
            // Notify other page-specific calculators to update outputs
            window.dispatchEvent(new Event('currencyChange'));
        });
    }
});
