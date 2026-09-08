import CONFIG from "./config.js";

export function renderNav() {
    const navHtml = `
    <nav>
        <a href="${CONFIG.navLinks[0].url}" class="logo">${CONFIG.siteName.slice(0, 5)}<span style="color: var(--accent-color);">${CONFIG.siteName.slice(5)}</span></a>
        <div class="nav-search-container" style="display: flex; align-items: center; background: rgba(255,255,255,0.05); border-radius: 20px; padding: 5px 15px; border: 1px solid rgba(100,255,218,0.2);">
            <span style="color: var(--accent-color); margin-right: 10px;">🔍</span>
            <input type="text" id="global-search" placeholder="Search Academy, News..." style="background: transparent; border: none; color: white; outline: none; font-size: 0.8rem; width: 150px;">
        </div>
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

        container.innerHTML = data.map((item, index) => {
            const isPremium = index === data.length - 1; // Lock the last item
            const clickHandler = isPremium ? `window.unlockPremium(\${item.id}) ? alert(\`${item.content}\`) : null` : `alert(\`${item.content}\`)`;
            
            return `
            <div class="capsule" onclick="\${${clickHandler}}">
                <div class="capsule-icon">${isPremium ? "??" : item.icon}</div>
                <h3>${item.title} ${isPremium ? " (Premium)" : ""}</h3>
                <p>${item.summary}</p>
                <span style="color: var(--accent-color); font-size: 0.8rem; margin-top: 10px; display: block;">${isPremium ? "Unlock to read &rarr;" : "Click to expand &rarr;"}</span>
            </div>
            `;
        }).join("");
    } catch (error) {
        console.error("Error loading academy:", error);
        container.innerHTML = "<p>Failed to load knowledge capsules.</p>";
    }
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

export function initRRCalculator() {
    const btn = document.getElementById("rr-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const dir = document.getElementById("rr-dir").value;
        const entry = parseFloat(document.getElementById("rr-entry").value);
        const sl = parseFloat(document.getElementById("rr-sl").value);
        const tp = parseFloat(document.getElementById("rr-tp").value);

        if (isNaN(entry) || isNaN(sl) || isNaN(tp)) {
            alert("Please enter valid prices");
            return;
        }

        let risk, reward;
        if (dir === "long") {
            risk = entry - sl;
            reward = tp - entry;
        } else {
            risk = sl - entry;
            reward = entry - tp;
        }

        if (risk <= 0) {
            alert("Stop Loss must be on the opposite side of Entry");
            return;
        }

        const rr = reward / risk;
        const pipsSL = (Math.abs(entry - sl) * 10000).toFixed(1);
        const pipsTP = (Math.abs(tp - entry) * 10000).toFixed(1);

        document.getElementById("rr-result").style.display = "block";
        document.getElementById("result-rr").textContent = `1:${rr.toFixed(2)}`;
        document.getElementById("result-pips").textContent = `SL: ${pipsSL} pips | TP: ${pipsTP} pips`;
    });
}

export function initJournal() {
    const form = document.getElementById("journal-form");
    if (!form) return;

    const loadTrades = () => {
        const trades = JSON.parse(localStorage.getItem("qe_trades") || "[]");
        const body = document.getElementById("journal-body");
        
        body.innerHTML = trades.map((t, index) => `
            <tr>
                <td>${t.date}</td>
                <td>${t.pair}</td>
                <td class="outcome-${t.outcome.toLowerCase()}">${t.outcome}</td>
                <td>${t.rr}</td>
                <td><button class="btn-delete" onclick="window.deleteTrade(${index})">Delete</button></td>
            </tr>
        `).join("");

        updateJournalMetrics(trades);
    };

    const updateJournalMetrics = (trades) => {
        const total = trades.length;
        const wins = trades.filter(t => t.outcome === "Win").length;
        const losses = trades.filter(t => t.outcome === "Loss").length;
        const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : 0;

        document.getElementById("win-rate").textContent = winRate + "%";
        document.getElementById("total-trades").textContent = total;
        document.getElementById("total-wins").textContent = wins;
        document.getElementById("total-losses").textContent = losses;
    };

    window.deleteTrade = (index) => {
        const trades = JSON.parse(localStorage.getItem("qe_trades") || "[]");
        trades.splice(index, 1);
        localStorage.setItem("qe_trades", JSON.stringify(trades));
        loadTrades();
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTrade = {
            pair: document.getElementById("j-pair").value,
            outcome: document.getElementById("j-outcome").value,
            rr: document.getElementById("j-rr").value,
            date: document.getElementById("j-date").value,
            notes: document.getElementById("j-notes").value
        };

        const trades = JSON.parse(localStorage.getItem("qe_trades") || "[]");
        trades.push(newTrade);
        localStorage.setItem("qe_trades", JSON.stringify(trades));
        form.reset();
        loadTrades();
    });

    loadTrades();
}

export async function renderLivePrices() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return;

    try {
        // Fetching BTC, ETH, SOL prices from CoinGecko (No API Key required for public)
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd");
        const data = await response.json();

        const priceHtml = `
            <div class="sidebar-widget" style="margin-top: 2rem;">
                <h4>Live Quant Feed</h4>
                <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span>BTC/USD</span> <span style="color: var(--accent-color); font-weight: 700;">$${data.bitcoin.usd.toLocaleString()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>ETH/USD</span> <span style="color: var(--accent-color); font-weight: 700;">$${data.ethereum.usd.toLocaleString()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span>SOL/USD</span> <span style="color: var(--accent-color); font-weight: 700;">$${data.solana.usd.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        `;
        sidebar.insertAdjacentHTML("beforeend", priceHtml);
    } catch (error) {
        console.error("Price API error:", error);
    }
}



export function renderLeadModal() {
    const modalHtml = `
    <div id="lead-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 2000; justify-content: center; align-items: center; backdrop-filter: blur(5px);">
        <div class="card" style="max-width: 400px; text-align: center; border: 2px solid var(--accent-color);">
            <div style="font-size: 3rem; margin-bottom: 1rem;">??</div>
            <h3 style="color: white;">Unlock Premium Insight</h3>
            <p style="margin-bottom: 1.5rem; color: var(--text-dim);">Join our inner circle to access this institutional analysis. We only send high-conviction updates.</p>
            <form id="lead-form" style="display: flex; flex-direction: column; gap: 1rem;">
                <input type="email" id="lead-email" placeholder="your@email.com" required style="padding: 0.8rem; background: var(--bg-color); border: 1px solid var(--text-dim); color: var(--white); border-radius: 4px;">
                <button type="submit" class="btn btn-primary">Unlock Now</button>
            </form>
            <button onclick="document.getElementById(\"lead-modal\").style.display=\"none\"" style="background: transparent; border: none; color: var(--text-dim); margin-top: 1rem; cursor: pointer; font-size: 0.8rem;">Maybe later</button>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML("beforeend", modalHtml);
}


