document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('header .nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for nav links & close mobile menu on click
    document.querySelectorAll('header .nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header')?.offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('main section[id]');
    const navLiAnchors = document.querySelectorAll('header .nav-links li a');

    function changeActiveLink() {
        let index = sections.length;
        const headerHeight = document.querySelector('header')?.offsetHeight || 70;

        while (--index && window.pageYOffset + headerHeight + 50 < sections[index].offsetTop) {}

        navLiAnchors.forEach((link) => link.classList.remove('active'));

        if (sections[index]) {
            const activeSectionId = sections[index].id;
            const correspondingLink = document.querySelector(`header .nav-links a[href="#${activeSectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        } else if (window.pageYOffset < (sections[0]?.offsetTop || 0) - headerHeight) {
            const homeLink = document.querySelector('header .nav-links a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    if (sections.length > 0 && navLiAnchors.length > 0) {
        changeActiveLink();
        window.addEventListener('scroll', changeActiveLink);
    }

    // Hero Image Alternating Animation
    const heroImages = document.querySelectorAll('.hero-image-alternating');
    let currentHeroImageIndex = 0;
    const heroAnimationInterval = 4000;
    let animationInterval = null;

    function showNextHeroImage() {
        if (heroImages.length === 0) return;

        heroImages[currentHeroImageIndex].classList.remove('is-visible');
        currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
        heroImages[currentHeroImageIndex].classList.add('is-visible');
    }

    // Check if the device is mobile (max-width: 768px)
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

    // Debounce function for resize event
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Initialize hero images based on device
    function initializeHeroImages() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }

        if (heroImages.length > 0 && !isMobile()) {
            heroImages.forEach(img => img.classList.remove('is-visible'));
            heroImages[0].classList.add('is-visible');
            if (heroImages.length > 1) {
                animationInterval = setInterval(showNextHeroImage, heroAnimationInterval);
            }
        }
    }

    // Initial call
    initializeHeroImages();

    // Handle window resize with debouncing
    window.addEventListener('resize', debounce(() => {
        initializeHeroImages();
    }, 250));

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});