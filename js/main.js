document.addEventListener("DOMContentLoaded", () => {
    console.log("QuantEdge Website Loaded Successfully");

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
        if (window.scrollY > 50) {
            nav.style.boxShadow = "0 10px 30px -10px rgba(2, 12, 27, 0.7)";
            nav.style.padding = "1rem 10%";
        } else {
            nav.style.boxShadow = "none";
            nav.style.padding = "1.5rem 10%";
        }
    });
});
