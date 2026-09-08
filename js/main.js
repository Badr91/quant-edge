import { renderNav, renderFooter, renderAnalysis, initCalculator } from "./components.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("QuantEdge Website Loaded Successfully");

    // Render common components
    renderNav();
    renderFooter();
    
    // Page-specific initializations
    renderAnalysis();
    initCalculator();

    // Analysis Filtering Logic
    const filterBtn = document.getElementById("analysis-filter");
    if (filterBtn) {
        filterBtn.addEventListener("change", (e) => {
            renderAnalysis(e.target.value);
        });
    }

    // Add reveal class to all cards and section titles for animation
    document.querySelectorAll(".card, .section-title").forEach(el => {
        el.classList.add("reveal");
    });

    // Intersection Observer for reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    // Smooth scrolling for anchor links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // Simple Navbar effect on scroll
    window.addEventListener("scroll", () => {
        const nav = document.querySelector("nav");
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.boxShadow = "0 10px 30px -10px rgba(2, 12, 27, 0.7)";
                nav.style.padding = "1rem 10%";
            } else {
                nav.style.boxShadow = "none";
                nav.style.padding = "1.5rem 10%";
            }
        }
    });
});



