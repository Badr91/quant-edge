import { renderNav, renderFooter, renderAnalysis, initCalculator, renderNews, renderAcademy, renderHomeNews, initRRCalculator, initJournal, renderLivePrices, renderLeadModal } from "./components.js";

document.addEventListener("DOMContentLoaded", () => {
    console.log("QuantEdge Website Loaded Successfully");

    // Register Service Worker for PWA
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js").then(reg => {
                console.log("SW Registered!");
            }).catch(err => {
                console.log("SW Registration Failed:", err);
            });
        });
    }

    // Render common components
    renderNav();
    renderFooter();
    renderLeadModal();
    
    // Page-specific initializations
    renderAnalysis();
    renderNews();
    renderAcademy();
    renderHomeNews();
    initCalculator();
    initRRCalculator();
    initJournal();
    renderLivePrices();

    // GLOBAL SEARCH LOGIC
    const searchInput = document.getElementById("global-search");
    if (searchInput) {
        searchInput.addEventListener("input", async (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 3) return;

            try {
                const [news, academy, analysis] = await Promise.all([
                    fetch("./data/news.json").then(r => r.json()),
                    fetch("./data/knowledge.json").then(r => r.json()),
                    fetch("./data/analysis.json").then(r => r.json())
                ]);

                const results = [
                    ...news.filter(i => i.title.toLowerCase().includes(query)).map(i => ({...i, type: 'News'})),
                    ...academy.filter(i => i.title.toLowerCase().includes(query)).map(i => ({...i, type: 'Academy'})),
                    ...analysis.filter(i => i.title.toLowerCase().includes(query)).map(i => ({...i, type: 'Analysis'}))
                ];

                console.log("Search Results:", results);
                // In a full app, we would render a search dropdown here.
                if(results.length > 0) {
                    alert(`Found ${results.length} results. Check your console for details!`);
                }
            } catch (err) {
                console.error("Search error:", err);
            }
        });
    }

    // GATED CONTENT LOGIC
    window.unlockPremium = (id) => {
        if (localStorage.getItem("qe_premium_unlocked") === "true") {
            return true;
        }
        document.getElementById("lead-modal").style.display = "flex";
        return false;
    };

    const leadForm = document.getElementById("lead-form");
    if (leadForm) {
        leadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("lead-email").value;
            console.log("Capturing Lead:", email);
            localStorage.setItem("qe_premium_unlocked", "true");
            document.getElementById("lead-modal").style.display = "none";
            alert("Access Granted! Welcome to the inner circle.");
        });
    }

    // Analysis Filtering Logic
    const filterBtn = document.getElementById("analysis-filter");
    if (filterBtn) {
        filterBtn.addEventListener("change", (e) => {
            renderAnalysis(e.target.value);
        });
    }

    // Add reveal class to all cards and section titles for animation
    document.querySelectorAll(".card, .section-title, .news-card, .capsule").forEach(el => {
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






