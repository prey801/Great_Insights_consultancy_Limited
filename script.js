document.addEventListener('DOMContentLoaded', function() {

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true,    // whether animation should happen only once - while scrolling down
        offset: 100,   // offset (in px) from the original trigger point
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('header .nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active'); // For hamburger animation
        });
    }

    // Smooth scrolling for nav links & close mobile menu on click
    document.querySelectorAll('header .nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset for fixed header
                const headerOffset = document.querySelector('header')?.offsetHeight || 70; // Get header height or default
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
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
    const sections = document.querySelectorAll('main section[id]'); // Ensure sections have IDs
    const navLiAnchors = document.querySelectorAll('header .nav-links li a');

    function changeActiveLink() {
        let index = sections.length;
        const headerHeight = document.querySelector('header')?.offsetHeight || 70;

        while(--index && window.pageYOffset + headerHeight + 50 < sections[index].offsetTop) {} // 50 is a small buffer

        navLiAnchors.forEach((link) => link.classList.remove('active'));

        // Check if the found section's ID matches a nav link's href
        if (sections[index]) {
            const activeSectionId = sections[index].id;
            const correspondingLink = document.querySelector(`header .nav-links a[href="#${activeSectionId}"]`);
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        } else if (window.pageYOffset < (sections[0]?.offsetTop || 0) - headerHeight) {
            // If near the top before the first section, highlight "Home" or the first link
             const homeLink = document.querySelector('header .nav-links a[href="#hero"]'); // Assuming hero is the first section
             if (homeLink) homeLink.classList.add('active');
        }
    }

    // Initial call to set active link on page load
    if (sections.length > 0 && navLiAnchors.length > 0) {
        changeActiveLink();
        window.addEventListener('scroll', changeActiveLink);
    }


    // Hero Image Alternating Animation
    const heroImages = document.querySelectorAll('.hero-image-alternating');
    let currentHeroImageIndex = 0;
    const heroAnimationInterval = 4000; // Time in milliseconds (e.g., 4 seconds)

    function showNextHeroImage() {
        if (heroImages.length === 0) return; // No images to animate

        // Hide current image
        heroImages[currentHeroImageIndex].classList.remove('is-visible');

        // Move to next image index
        currentHeroImageIndex = (currentHeroImageIndex + 1) % heroImages.length;

        // Show next image
        heroImages[currentHeroImageIndex].classList.add('is-visible');
    }

    // Initial setup: show the first image
    if (heroImages.length > 0) {
        heroImages[0].classList.add('is-visible');
    }

    // Start the animation if there's more than one image
    if (heroImages.length > 1) {
        // Check if we are not on a small screen where images might be displayed differently
        // This assumes you have CSS that changes the layout for .hero-image-alternating on smaller screens
        // and you might not want the JS animation to run then.
        // For simplicity, we'll let it run, but you could add a window.matchMedia check.
        setInterval(showNextHeroImage, heroAnimationInterval);
    }


    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});