import CONFIG from "./config.js";

export function renderNav() {
    const navHtml = `
    <nav>
        <a href="${CONFIG.navLinks[0].url}" class="logo">${CONFIG.siteName.slice(0, 5)}<span style="color: var(--accent-color);">${CONFIG.siteName.slice(5)}</span></a>
        <ul class="nav-links">
            ${CONFIG.navLinks.map(link => `<li><a href="${link.url}">${link.name}</a></li>`).join("")}
        </ul>
        <a href="${CONFIG.ctaLink}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">${CONFIG.ctaText}</a>
    </nav>
    `;
    document.body.insertAdjacentHTML("afterbegin", navHtml);
}

export function renderFooter() {
    const footerHtml = `
    <footer>
        <p>&copy; ${new Date().getFullYear()} ${CONFIG.siteName} Intelligence. All Rights Reserved.</p>
        <p style="font-size: 0.8rem; margin-top: 1rem;">Trading involves significant risk. Our framework is based on institutional liquidity models.</p>
    </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHtml);
}

export async function renderAnalysis(filter = "All") {
    const container = document.getElementById("analysis-grid");
    if (!container) return;

    try {
        const response = await fetch("./data/analysis.json");
        const data = await response.json();

        const filteredData = filter === "All" 
            ? data 
            : data.filter(item => item.category === filter);

        container.innerHTML = filteredData.map(item => `
            <div class="card">
                <div style="color: var(--accent-color); font-size: 0.8rem; margin-bottom: 0.5rem;">${item.date} &bull; ${item.category}</div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <a href="${item.link}" style="color: var(--accent-color); text-decoration: none; font-size: 0.8rem; display: block; margin-top: 1rem;">Read Full Analysis &rarr;</a>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error loading analysis data:", error);
        container.innerHTML = "<p>Failed to load analysis data.</p>";
    }
}

export async function renderNews() {
    const container = document.getElementById("news-feed");
    if (!container) return;

    try {
        const response = await fetch("./data/news.json");
        const data = await response.json();

        container.innerHTML = data.map(item => `
            <div class="news-card">
                <img src="${item.image}" class="news-image" alt="${item.title}">
                <div class="news-content">
                    <div class="news-meta">
                        <span>${item.date} &bull; ${item.category}</span>
                        <span class="news-source">${item.source}</span>
                    </div>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <a href="${item.link}" style="color: var(--accent-color); text-decoration: none; font-size: 0.8rem; display: block; margin-top: 1rem;">Full Story &rarr;</a>
                </div>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error loading news:", error);
        container.innerHTML = "<p>Failed to load news feed.</p>";
    }
}

export async function renderAcademy() {
    const container = document.getElementById("capsule-container");
    if (!container) return;

    try {
        const response = await fetch("./data/knowledge.json");
        const data = await response.json();

        container.innerHTML = data.map(item => `
            <div class="capsule" onclick="alert(\`${item.content}\`)">
                <div class="capsule-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <span style="color: var(--accent-color); font-size: 0.8rem; margin-top: 10px; display: block;">Click to expand &rarr;</span>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error loading academy:", error);
        container.innerHTML = "<p>Failed to load knowledge capsules.</p>";
    }
}

export function initCalculator() {
    const btn = document.getElementById("calc-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const balance = parseFloat(document.getElementById("calc-balance").value);
        const riskPct = parseFloat(document.getElementById("calc-risk").value);
        const stopLoss = parseFloat(document.getElementById("calc-sl").value);
        const pipValue = parseFloat(document.getElementById("calc-pair").value);

        if (isNaN(balance) || isNaN(riskPct) || isNaN(stopLoss)) {
            alert("Please enter valid numbers");
            return;
        }

        const riskAmount = balance * (riskPct / 100);
        const lotSize = riskAmount / (stopLoss * pipValue);

        document.getElementById("calc-result").style.display = "block";
        document.getElementById("result-lots").textContent = lotSize.toFixed(2) + " Lots";
        document.getElementById("result-risk-amount").textContent = `Risk Amount: $${riskAmount.toFixed(2)}`;
    });
}



export async function renderHomeNews() {
    const container = document.getElementById("home-news");
    if (!container) return;

    try {
        const response = await fetch("./data/news.json");
        const data = await response.json();

        const topNews = data.slice(0, 2);

        container.innerHTML = topNews.map(item => `
            <div class="news-card">
                <img src="${item.image}" class="news-image" alt="${item.title}">
                <div class="news-content">
                    <div class="news-meta">
                        <span>${item.date} &bull; ${item.category}</span>
                        <span class="news-source">${item.source}</span>
                    </div>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                    <a href="news.html" style="color: var(--accent-color); text-decoration: none; font-size: 0.8rem; display: block; margin-top: 1rem;">Read Full Story &rarr;</a>
                </div>
            </div>
        `).join("");
    } catch (error) {
        console.error("Error loading home news:", error);
    }
}

