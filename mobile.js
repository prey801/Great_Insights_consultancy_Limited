document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true
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
                const headerOffset = document.querySelector('header')?.offsetHeight || 60;
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
        const headerHeight = document.querySelector('header')?.offsetHeight || 60;

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

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});