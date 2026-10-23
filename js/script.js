/*
 * =========================
 * THEME TOGGLE
 * Светлая монохромная тема — по умолчанию (как на референсах)
 * =========================
 */

const themeToggle = document.getElementById("themeToggle");

// Get saved theme or default to light (reference design is light)
function getTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return "light";
}

// Apply theme
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

// Init theme
setTheme(getTheme());

// Toggle on click
if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        const next = current === "dark" ? "light" : "dark";
        setTheme(next);
    });
}


document.addEventListener("DOMContentLoaded", () => {

    /*
     * =========================
     * MOBILE MENU
     * =========================
     */

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNav");
    const mobileNavLinks = mobileNav.querySelectorAll(".nav-link");

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenuBtn.classList.toggle("active");
            mobileNav.classList.toggle("active");
            document.body.style.overflow = mobileNav.classList.contains("active") ? "hidden" : "";
        });

        // Close menu on link click
        mobileNavLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenuBtn.classList.remove("active");
                mobileNav.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }

    /*
     * =========================
     * HEADER SCROLL EFFECT
     * =========================
     */

    const header = document.getElementById("header");
    let lastScrollY = 0;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        lastScrollY = currentScrollY;
    });

    /*
     * =========================
     * NAVIGATION ACTIVE STATE
     * =========================
     */

    const navLinks = document.querySelectorAll(".header .nav-link");
    const sections = document.querySelectorAll("section[id]");

    const observerOptions = {
        root: null,
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    /*
     * =========================
     * FADE IN ON SCROLL
     * =========================
     */

    const fadeElements = document.querySelectorAll(
        ".section-header, .menu-column, .dessert-item, .about-content, .contact-content"
    );

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });

    fadeElements.forEach((el) => {
        el.classList.add("fade-in");
        fadeObserver.observe(el);
    });

    /*
     * =========================
     * SMOOTH SCROLL
     * =========================
     */

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
