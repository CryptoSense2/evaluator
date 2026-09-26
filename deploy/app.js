/* EVALUATOR app - carousel + search/analyze over expanded project catalog */

const CURATED = {
  bitcoin: {
    tint: "#F7931A",
    blurb: "Store of value. Deepest liquidity in crypto.",
    score: 94,
    dims: { predictive: 92, stability: 96, robustness: 95, logic: 90, diversity: 88 },
    flags: [],
  },
  ethereum: {
    tint: "#627EEA",
    blurb: "Settlement + smart contracts. Core L1 for DeFi.",
    score: 91,
    dims: { predictive: 90, stability: 89, robustness: 88, logic: 93, diversity: 86 },
  },
  solana: {
    tint: "#9945FF",
    blurb: "High throughput L1. Strong retail + meme velocity.",
    score: 88,
    dims: { predictive: 89, stability: 78, robustness: 82, logic: 86, diversity: 84 },
    flags: ["high IC, unstable sign in 2022"],
    featured: true,
  },
  binancecoin: {
    tint: "#F3BA2F",
    blurb: "Exchange rail + BNB Chain gravity.",
    score: 89,
  },
  ripple: {
    tint: "#23292F",
    blurb: "Payments narrative. Regulatory path still prices risk.",
    score: 85,
  },
  dogecoin: {
    tint: "#C2A633",
    blurb: "Meme beta. Attention beta, not cashflow beta.",
    flags: ["strong correlation with momentum"],
  },
  cardano: { tint: "#0033AD", blurb: "Research-heavy L1. Slow ship, sticky community." },
  "the-open-network": { tint: "#0098EA", blurb: "Telegram distribution. Fast UX, young market sample.", flags: ["short sample"] },
  tron: { tint: "#FF0013", blurb: "Stablecoin settlement volume. Contested governance opticals." },
  "avalanche-2": { tint: "#E84142", blurb: "Subnet thesis. Liquidity thinner than majors.", flags: ["broke on 2022 holdout"] },
  chainlink: { tint: "#2A5ADA", blurb: "Oracle standard. CCIP expands the surface.", score: 90 },
  uniswap: { tint: "#FF007A", blurb: "Dominant AMM. Fee switch narrative still open." },
  aave: { tint: "#B6509E", blurb: "Blue-chip lending. Governance + GHO still evolving." },
  pepe: {
    tint: "#3D9A3D",
    blurb: "Meme attention battery. Pure momentum beta.",
    flags: ["strong correlation with momentum", "high IC, unstable sign"],
  },
  "catalyst-2": {
    tint: "#6C5CE7",
    logo: "catalyst",
    name: "CATALYST",
    ticker: "CATALYST",
    score: 73,
    blurb: "Modular cross-chain liquidity (Cata Labs). Seed $4.2M Spartan-led. Short sample until liquid IC history.",
    dims: { predictive: 68, stability: 58, robustness: 82, logic: 84, diversity: 76 },
    flags: ["short sample", "no liquid IC history"],
    featured: true,
  },
  linera: {
    tint: "#3878FF",
    logo: "linera",
    name: "LINERA",
    ticker: "LINERA",
    score: 80,
    blurb: "Microchain L1 for elastic Web3 scale. Total seed $12M (a16z + Borderless). Short sample until liquid IC history.",
    dims: { predictive: 78, stability: 62, robustness: 90, logic: 88, diversity: 80 },
    flags: ["short sample", "pre-token / early network sample"],
    featured: true,
  },
};

let PROJECTS = [];
let CAROUSEL = [];

const track = document.getElementById("carouselTrack");
const analysisEl = document.getElementById("analysis");
const suggestEl = document.getElementById("suggest");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

function normalizeProject(raw) {
  const cur = CURATED[raw.id] || {};
  const logoKey = cur.logo || raw.logo || (raw.ticker || "").toLowerCase();
  return {
    id: raw.id,
    name: (cur.name || raw.name || raw.ticker || "").toUpperCase(),
    ticker: (cur.ticker || raw.ticker || "").toUpperCase(),
    score: cur.score ?? raw.score ?? 50,
    tint: cur.tint || raw.tint || "#3b82ff",
    logo: `./assets/icons/${logoKey}.png`,
    blurb: cur.blurb || raw.blurb || "Composite factor score from catalog.",
    dims: { ...(raw.dims || {}), ...(cur.dims || {}) },
    flags: cur.flags || raw.flags || [],
    ic: cur.ic || raw.ic || [],
    featured: cur.featured ?? raw.featured ?? false,
    rank: raw.rank ?? 999,
    trending: !!raw.trending,
  };
}

function cardHTML(proj, featuredOverride) {
  const featured = featuredOverride ?? proj.featured;
  return `
    <article class="score-card${featured ? " featured" : ""}" data-id="${proj.id}" style="--tint:${proj.tint}">
      ${featured ? '<div class="featured-badge">FEATURED</div>' : ""}
      <div class="coin">
        <img src="${proj.logo}" alt="${proj.ticker}" width="44" height="44" loading="lazy" onerror="this.style.display='none';this.parentElement.textContent='${(proj.ticker || '?')[0]}'" />
      </div>
      <h3>${proj.name}</h3>
      <span class="label">Score</span>
      <strong class="num">${proj.score}</strong>
      <button type="button" class="more" data-open="${proj.id}">MORE -></button>
    </article>
  `;
}

let offset = 0;
let cardW = 168;
const gap = 16;
let timer;

function buildCarousel() {
  if (!track || !CAROUSEL.length) return;
  const loop = [...CAROUSEL, ...CAROUSEL, ...CAROUSEL];
  track.innerHTML = loop
    .map((proj, i) => cardHTML(proj, i % CAROUSEL.length === 2))
    .join("");
}

function measure() {
  if (!track) return;
  const card = track.querySelector(".score-card");
  if (card) cardW = card.getBoundingClientRect().width;
}

function setTransform(animate = true) {
  if (!track) return;
  track.style.transition = animate ? "transform 0.55s cubic-bezier(.22,.8,.28,1)" : "none";
  track.style.transform = `translateX(${-offset}px)`;
}

function step(dir = 1) {
  if (!CAROUSEL.length) return;
  measure();
  const one = cardW + gap;
  const setWidth = CAROUSEL.length * one;
  offset += dir * one;
  setTransform(true);
  if (offset >= setWidth * 2) {
    offset -= setWidth;
    requestAnimationFrame(() => setTransform(false));
  } else if (offset < setWidth) {
    offset += setWidth;
    requestAnimationFrame(() => setTransform(false));
  }
}

function startAuto() {
  stopAuto();
  timer = setInterval(() => step(1), 2600);
}
function stopAuto() {
  if (timer) clearInterval(timer);
}

function findProject(q) {
  const s = q.trim().toLowerCase();
  if (!s) return null;
  return (
    PROJECTS.find((x) => x.name.toLowerCase() === s || x.ticker.toLowerCase() === s || x.id === s) ||
    PROJECTS.find(
      (x) =>
        x.name.toLowerCase().includes(s) ||
        x.ticker.toLowerCase().includes(s) ||
        x.id.includes(s)
    )
  );
}

function bar(label, weight, value, tint) {
  return `
    <div class="bar-row">
      <div class="bar-meta">
        <span class="bar-label">${label}<em>${weight}</em></span>
        <strong>${value}</strong>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(0, Math.min(100, value))}%;background:${tint}"></div></div>
    </div>
  `;
}

function renderAnalysis(proj) {
  if (!analysisEl) return;
  if (!proj) {
    analysisEl.hidden = true;
    analysisEl.innerHTML = "";
    return;
  }
  const d = proj.dims || {};
  analysisEl.hidden = false;
  analysisEl.innerHTML = `
    <div class="analysis-head">
      <div class="analysis-title">
        <div class="coin big"><img src="${proj.logo}" alt="${proj.ticker}" width="56" height="56" onerror="this.style.display='none'" /></div>
        <div>
          <h3>${proj.name} <em>${proj.ticker}</em></h3>
          <p>${proj.blurb}</p>
        </div>
      </div>
      <div class="analysis-score">
        <span>Composite</span>
        <strong>${proj.score}</strong>
      </div>
    </div>
    <div class="dim-bars">
      ${bar("Predictive Power", "w 35-40%", d.predictive ?? 0, proj.tint)}
      ${bar("Temporal Stability", "w 20-25%", d.stability ?? 0, proj.tint)}
      ${bar("Robustness", "w 15-20%", d.robustness ?? 0, proj.tint)}
      ${bar("Logic / Interpretability", "w 10-15%", d.logic ?? 0, proj.tint)}
      ${bar("Diversity", "w ~10%", d.diversity ?? 0, proj.tint)}
    </div>
    <div class="analysis-grid">
      <div>
        <h4>IC by period</h4>
        ${
          proj.ic?.length
            ? `<table>
          <thead><tr><th>Period</th><th>IC</th><th>RankIC</th></tr></thead>
          <tbody>
            ${proj.ic
              .map(
                (r) =>
                  `<tr><td>${r.period}</td><td>${Number(r.ic).toFixed(2)}</td><td>${Number(r.rank).toFixed(2)}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>`
            : `<p class="muted">IC history still thin for this name.</p>`
        }
      </div>
      <div>
        <h4>Red flags</h4>
        ${
          proj.flags?.length
            ? `<ul class="flag-list">${proj.flags.map((f) => `<li>${f}</li>`).join("")}</ul>`
            : `<p class="ok">No critical flags on holdout sample.</p>`
        }
        <p class="muted tiny">Demo composite - catalog scores, not live market advice. Weights follow IC + stability first MVP.</p>
      </div>
    </div>
  `;
  analysisEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderSuggest(q) {
  if (!suggestEl) return;
  const s = q.trim().toLowerCase();
  if (s.length < 1) {
    suggestEl.hidden = true;
    suggestEl.innerHTML = "";
    return;
  }
  const hits = PROJECTS.filter(
    (x) =>
      x.name.toLowerCase().includes(s) ||
      x.ticker.toLowerCase().includes(s) ||
      x.id.includes(s)
  ).slice(0, 14);
  if (!hits.length) {
    suggestEl.hidden = false;
    suggestEl.innerHTML = `<button type="button" class="suggest-item muted" disabled>No match - try BTC, HYPE, WIF, ONDO...</button>`;
    return;
  }
  suggestEl.hidden = false;
  suggestEl.innerHTML = hits
    .map(
      (x) =>
        `<button type="button" class="suggest-item" data-pick="${x.id}">
          <span class="suggest-left"><img src="${x.logo}" alt="" width="22" height="22" onerror="this.style.visibility='hidden'" /><span>${x.name} <i>${x.ticker}</i></span></span>
          <em>${x.score}</em>
        </button>`
    )
    .join("");
}

function wireSearchAndCarousel() {
  if (!track) return;

  buildCarousel();
  measure();
  offset = CAROUSEL.length * (cardW + gap);
  setTransform(false);
  startAuto();

  document.querySelector(".car-btn.next")?.addEventListener("click", () => {
    step(1);
    startAuto();
  });
  document.querySelector(".car-btn.prev")?.addEventListener("click", () => {
    step(-1);
    startAuto();
  });

  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);

  // touch swipe
  let touchX = null;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0].clientX;
      stopAuto();
    },
    { passive: true }
  );
  track.addEventListener(
    "touchend",
    (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
      touchX = null;
      startAuto();
    },
    { passive: true }
  );

  track.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open]");
    const card = e.target.closest(".score-card");
    const id = btn?.dataset.open || card?.dataset.id;
    if (!id) return;
    const proj = PROJECTS.find((x) => x.id === id);
    if (proj) {
      if (searchInput) searchInput.value = proj.name;
      if (suggestEl) suggestEl.hidden = true;
      renderAnalysis(proj);
    }
  });

  searchInput?.addEventListener("input", () => renderSuggest(searchInput.value));
  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const proj = findProject(searchInput.value);
    if (suggestEl) suggestEl.hidden = true;
    if (!proj) {
      if (analysisEl) {
        analysisEl.hidden = false;
        analysisEl.innerHTML = `<p class="miss">No project found for "${searchInput.value}". Try BTC, SOL, HYPE, WIF, ONDO, PEPE...</p>`;
      }
      return;
    }
    renderAnalysis(proj);
  });

  suggestEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-pick]");
    if (!btn) return;
    const proj = PROJECTS.find((x) => x.id === btn.dataset.pick);
    if (!proj) return;
    if (searchInput) searchInput.value = proj.name;
    suggestEl.hidden = true;
    renderAnalysis(proj);
  });

  window.addEventListener("resize", () => {
    measure();
    offset = CAROUSEL.length * (cardW + gap);
    setTransform(false);
  });
}

async function loadProjects() {
  try {
    const res = await fetch("./data/projects.json?v=" + Date.now());
    if (!res.ok) throw new Error("missing projects.json");
    const data = await res.json();
    PROJECTS = (data.projects || []).map(normalizeProject);
  } catch (err) {
    console.warn(err);
    PROJECTS = [];
  }

  if (!PROJECTS.length) {
    return;
  }

  // carousel: top liquid names + a few trending, capped for UI speed
  const top = PROJECTS.filter((p) => p.rank <= 40).slice(0, 28);
  const trending = PROJECTS.filter((p) => p.trending && !top.some((t) => t.id === p.id)).slice(0, 8);
  CAROUSEL = [...top, ...trending];
  if (!CAROUSEL.length) CAROUSEL = PROJECTS.slice(0, 24);

  if (searchInput) {
    searchInput.placeholder = `Search ${PROJECTS.length}+ projects - BTC, HYPE, WIF, ONDO...`;
  }

  wireSearchAndCarousel();
}

loadProjects();

/* ---- HOT PROJECTS (hot.html) ---- */
const hotGrid = document.getElementById("hotGrid");
const hotAnalysis = document.getElementById("hotAnalysis");
const hotUpdated = document.getElementById("hotUpdated");
let HOT = [];

function fmtRaise(n) {
  if (n == null) return "Raise TBA";
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B raised`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M raised`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K raised`;
  return `$${n} raised`;
}

function renderHotAnalysis(item) {
  if (!hotAnalysis) return;
  if (!item) {
    hotAnalysis.hidden = true;
    hotAnalysis.innerHTML = "";
    return;
  }
  const d = item.dims;
  const tint = "#ff8c42";
  hotAnalysis.hidden = false;
  hotAnalysis.innerHTML = `
    <div class="analysis-head">
      <div class="analysis-title">
        <div>
          <h3>${item.name}${item.ticker ? ` <em>${item.ticker}</em>` : ""}</h3>
          <p>${item.type || "Deal"} | ${item.when || "TBA"} | ${item.source}</p>
        </div>
      </div>
      <div class="analysis-score">
        <span>Hot composite</span>
        <strong>${item.score}</strong>
      </div>
    </div>
    <p class="muted" style="margin:0 0 14px">${item.scoreNote || ""}</p>
    <div class="dim-bars">
      ${bar("Predictive Power (proxy)", "w 30%", d.predictive, tint)}
      ${bar("Temporal Stability (proxy)", "w 20%", d.stability, tint)}
      ${bar("Robustness", "w 25%", d.robustness, tint)}
      ${bar("Logic / Interpretability", "w 15%", d.logic, tint)}
      ${bar("Diversity", "w 10%", d.diversity, tint)}
    </div>
    <div class="analysis-grid">
      <div>
        <h4>Deal facts</h4>
        <table>
          <tbody>
            <tr><td>Raise</td><td>${fmtRaise(item.raiseUsd)}</td></tr>
            <tr><td>When</td><td>${item.when || "TBA"}</td></tr>
            <tr><td>Type</td><td>${item.type || "-"}</td></tr>
            <tr><td>Tags</td><td>${(item.tags || []).join(", ") || "-"}</td></tr>
            <tr><td>Investors</td><td>${(item.investors || []).slice(0, 8).join(", ") || "n/a"}</td></tr>
            ${item.moniScore != null ? `<tr><td>Moni score</td><td>${item.moniScore}</td></tr>` : ""}
          </tbody>
        </table>
      </div>
      <div>
        <h4>Red flags</h4>
        ${
          item.flags?.length
            ? `<ul class="flag-list">${item.flags.map((f) => `<li>${f}</li>`).join("")}</ul>`
            : `<p class="ok">No critical flags on disclosed feed fields.</p>`
        }
      </div>
    </div>
  `;
  hotAnalysis.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderHotGrid(list) {
  if (!hotGrid) return;
  hotGrid.innerHTML = list
    .map((item, idx) => {
      const srcClass = item.source === "cryptorank" ? "source-cr" : "source-cf";
      const srcLabel = item.source === "cryptorank" ? "CryptoRank" : "Fundraising";
      return `
        <button type="button" class="hot-card" data-hot="${idx}">
          <div class="hot-card-top">
            <h3>${item.name}${item.ticker ? ` - ${item.ticker}` : ""}</h3>
            <span class="hot-score">${item.score}</span>
          </div>
          <div class="hot-meta">
            <span class="hot-chip ${srcClass}">${srcLabel}</span>
            <span class="hot-chip">${item.type || "Deal"}</span>
            ${(item.tags || []).slice(0, 3).map((t) => `<span class="hot-chip">${t}</span>`).join("")}
          </div>
          <p class="hot-raise">${fmtRaise(item.raiseUsd)} | ${item.when || "TBA"}</p>
          ${
            item.investors?.length
              ? `<p class="hot-investors">${item.investors.slice(0, 4).join(" / ")}</p>`
              : ""
          }
        </button>
      `;
    })
    .join("");
}

async function loadHotProjects() {
  if (!hotGrid) return;
  try {
    const res = await fetch("./data/hot-projects.json?v=" + Date.now());
    if (!res.ok) throw new Error("fetch failed");
    const data = await res.json();
    HOT = data.projects || [];
    if (hotUpdated) {
      hotUpdated.textContent = data.updatedAt
        ? `Feed refreshed ${data.updatedAt.replace("T", " ").slice(0, 19)} UTC | ${HOT.length} projects scored`
        : "";
    }
    renderHotGrid(HOT);
    if (HOT[0]) renderHotAnalysis(HOT[0]);
  } catch (err) {
    hotGrid.innerHTML = `<p class="miss">Could not load hot feed. Run scripts/fetch_hot_projects.py</p>`;
  }
}

hotGrid?.addEventListener("click", (e) => {
  const card = e.target.closest("[data-hot]");
  if (!card) return;
  const idx = Number(card.dataset.hot);
  document.querySelectorAll(".hot-card").forEach((c) => c.classList.remove("active"));
  card.classList.add("active");
  renderHotAnalysis(HOT[idx]);
});

loadHotProjects();
