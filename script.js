document.addEventListener('DOMContentLoaded', function() {
    // Redirect to mobile.html for mobile devices
    if (/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 992) {
        window.location.href = 'mobile.html';
        return; // Stop further execution if redirected
    }

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
    const heroImages = document.querySelectorAll('.hero-images-column .hero-image');
    let currentHeroImageIndex = 0;
    const heroAnimationInterval = 4000; // Match CSS 4s per image
    let animationInterval = null;

    function showNextHeroImage() {
        if (heroImages.length === 0) return;

        const isMobile = window.matchMedia('(max-width: 992px)').matches;

        // Reset all images
        heroImages.forEach((img, index) => {
            img.style.opacity = '0';
            img.style.zIndex = 6 - index;
            img.style.transform = 'scale(0.95)';
            if (isMobile) {
                img.style.display = 'none';
            }
            img.classList.remove('is-visible');
        });

        // Show current image
        const currentImage = heroImages[currentHeroImageIndex];
        currentImage.style.opacity = '1';
        currentImage.style.zIndex = '10';
        currentImage.style.transform = 'scale(1)';
        if (isMobile) {
            currentImage.style.display = 'block';
        }
        currentImage.classList.add('is-visible');

        currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;
    }

    // Disable AOS for hero images
    heroImages.forEach(img => {
        img.removeAttribute('data-aos');
        img.removeAttribute('data-aos-delay');
    });

    // Initialize hero images
    function initializeHeroImages() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }

        if (heroImages.length > 0) {
            const isMobile = window.matchMedia('(max-width: 992px)').matches;

            // Reset all images
            heroImages.forEach(img => {
                img.style.opacity = '0';
                img.style.transform = 'scale(0.95)';
                if (isMobile) {
                    img.style.display = 'none';
                }
                img.classList.remove('is-visible');
            });

            // Show first image
            heroImages[0].style.opacity = '1';
            heroImages[0].style.zIndex = '10';
            heroImages[0].style.transform = 'scale(1)';
            if (isMobile) {
                heroImages[0].style.display = 'block';
            }
            heroImages[0].classList.add('is-visible');

            // Start cycle if multiple images
            if (heroImages.length > 1) {
                animationInterval = setInterval(showNextHeroImage, heroAnimationInterval);
            }
        }
    }

    // Initial call
    initializeHeroImages();

    // Handle window resize with debouncing
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

    window.addEventListener('resize', debounce(() => {
        initializeHeroImages();
    }, 250));

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});