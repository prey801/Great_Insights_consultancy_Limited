document.addEventListener('DOMContentLoaded', function() {
    // Redirect to mobile.html for mobile devices
    if (/Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 768) {
        window.location.href = 'mobile.html';
        return; // Stop further execution if redirected
    }

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // Disable AOS for hero slides
    document.querySelectorAll('.hero-slide').forEach(slide => {
        slide.removeAttribute('data-aos');
        slide.removeAttribute('data-aos-delay');
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for nav links & close mobile menu on click
    document.querySelectorAll('.nav-links a').forEach(anchor => {
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
    const sections = document.querySelectorAll('section[id]');
    const navLiAnchors = document.querySelectorAll('.nav-links li a');

    function changeActiveLink() {
        let index = sections.length;
        const headerHeight = document.querySelector('header')?.offsetHeight || 70;

        while (--index && window.pageYOffset + headerHeight + 50 < sections[index].offsetTop) {}

        navLiAnchors.forEach((link) => link.classList.remove('active'));

        if (sections[index]) {
            const activeSectionId = sections[index].id;
            const correspondingLink = document.querySelector(`.nav-links a[href="#${activeSectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        } else if (window.pageYOffset < (sections[0]?.offsetTop || 0) - headerHeight) {
            const homeLink = document.querySelector('.nav-links a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    if (sections.length > 0 && navLiAnchors.length > 0) {
        changeActiveLink();
        window.addEventListener('scroll', changeActiveLink);
    }

    // Hero Image Rotation with Captions
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const heroAnimationInterval = 4000; // 4 seconds per image

    function showNextSlide() {
        if (heroSlides.length === 0) return;
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }

    if (heroSlides.length > 0) {
        heroSlides[0].classList.add('active');
        if (heroSlides.length > 1) {
            setInterval(showNextSlide, heroAnimationInterval);
        }
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});