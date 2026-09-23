const PROJECTS = [
  p("bitcoin", "BITCOIN", "BTC", 94, "#F7931A", "btc", "Store of value. Deepest liquidity in crypto.", { predictive: 92, stability: 96, robustness: 95, logic: 90, diversity: 88 }, [], icY(0.08, 0.11, 0.09, 0.1)),
  p("ethereum", "ETHEREUM", "ETH", 91, "#627EEA", "eth", "Settlement + smart contracts. Core L1 for DeFi.", { predictive: 90, stability: 89, robustness: 88, logic: 93, diversity: 86 }, [], icY(0.06, 0.09, 0.1, 0.08)),
  p("solana", "SOLANA", "SOL", 88, "#9945FF", "sol", "High throughput L1. Strong retail + meme velocity.", { predictive: 89, stability: 78, robustness: 82, logic: 86, diversity: 84 }, ["high IC, unstable sign in 2022"], icY(-0.02, 0.14, 0.13, 0.09), true),
  p("bnb", "BNB", "BNB", 89, "#F3BA2F", "bnb", "Exchange rail + BNB Chain gravity.", { predictive: 87, stability: 88, robustness: 86, logic: 85, diversity: 80 }, [], icY(0.05, 0.08, 0.09, 0.07)),
  p("xrp", "XRP", "XRP", 85, "#23292F", "xrp", "Payments narrative. Regulatory path still prices risk.", { predictive: 84, stability: 82, robustness: 83, logic: 80, diversity: 79 }, [], icY(0.03, 0.07, 0.08, 0.06)),
  p("cardano", "CARDANO", "ADA", 78, "#0033AD", "ada", "Research-heavy L1. Slow ship, sticky community.", { predictive: 74, stability: 80, robustness: 77, logic: 82, diversity: 76 }, [], icY(0.02, 0.05, 0.06, 0.04)),
  p("dogecoin", "DOGECOIN", "DOGE", 72, "#C2A633", "doge", "Meme beta. Attention beta, not cashflow beta.", { predictive: 70, stability: 62, robustness: 68, logic: 65, diversity: 71 }, ["strong correlation with momentum"], icY(-0.01, 0.1, 0.08, 0.05)),
  p("ton", "TON", "TON", 83, "#0098EA", "ton", "Telegram distribution. Fast UX, young market sample.", { predictive: 84, stability: 70, robustness: 76, logic: 82, diversity: 78 }, ["short sample"], icY(0.04, 0.09, 0.1, 0.07)),
  p("tron", "TRON", "TRX", 80, "#FF0013", "trx", "Stablecoin settlement volume. Contested governance opticals.", { predictive: 79, stability: 81, robustness: 78, logic: 74, diversity: 73 }, [], icY(0.04, 0.06, 0.07, 0.05)),
  p("avalanche", "AVALANCHE", "AVAX", 82, "#E84142", "avax", "Subnet thesis. Liquidity thinner than majors.", { predictive: 80, stability: 76, robustness: 79, logic: 84, diversity: 81 }, ["broke on 2022 holdout"], icY(-0.04, 0.06, 0.07, 0.05)),
  p("chainlink", "CHAINLINK", "LINK", 90, "#2A5ADA", "link", "Oracle standard. CCIP expands the surface.", { predictive: 88, stability: 91, robustness: 89, logic: 92, diversity: 85 }, [], icY(0.05, 0.08, 0.09, 0.08)),
  p("polkadot", "POLKADOT", "DOT", 77, "#E6007A", "dot", "Shared security + parachains. Complex product surface.", { predictive: 75, stability: 78, robustness: 76, logic: 80, diversity: 74 }, [], icY(0.02, 0.05, 0.06, 0.04)),
  p("polygon", "POLYGON", "POL", 79, "#8247E5", "matic", "L2 / sidechain hybrid story. Crowded competitive lane.", { predictive: 77, stability: 80, robustness: 78, logic: 81, diversity: 74 }, ["strong correlation with momentum"], icY(0.03, 0.05, 0.06, 0.04)),
  p("litecoin", "LITECOIN", "LTC", 81, "#345D9D", "ltc", "Payments classic. Lower narrative premium than BTC.", { predictive: 78, stability: 86, robustness: 84, logic: 79, diversity: 72 }, [], icY(0.04, 0.06, 0.05, 0.05)),
  p("uniswap", "UNISWAP", "UNI", 86, "#FF007A", "uni", "Dominant AMM. Fee switch narrative still open.", { predictive: 84, stability: 85, robustness: 83, logic: 88, diversity: 80 }, [], icY(0.04, 0.07, 0.08, 0.07)),
  p("aave", "AAVE", "AAVE", 87, "#B6509E", "aave", "Blue-chip lending. Governance + GHO still evolving.", { predictive: 85, stability: 88, robustness: 86, logic: 90, diversity: 83 }, [], icY(0.05, 0.08, 0.09, 0.07)),
  p("near", "NEAR", "NEAR", 76, "#00C08B", "near", "Sharded L1 + AI narrative. Score still path-dependent.", { predictive: 74, stability: 70, robustness: 72, logic: 80, diversity: 78 }, ["high IC, unstable sign"], icY(-0.03, 0.09, 0.07, 0.04)),
  p("cosmos", "COSMOS", "ATOM", 75, "#2E3148", "atom", "IBC hub. Appchain thesis vs L2 gravity.", { predictive: 73, stability: 74, robustness: 75, logic: 81, diversity: 77 }, [], icY(0.02, 0.05, 0.05, 0.04)),
  p("stellar", "STELLAR", "XLM", 74, "#14B6E7", "xlm", "Payments / remittance lane. Quiet beta.", { predictive: 72, stability: 79, robustness: 76, logic: 78, diversity: 70 }, [], icY(0.03, 0.04, 0.05, 0.04)),
  p("filecoin", "FILECOIN", "FIL", 73, "#0090FF", "fil", "Storage network. Utilization vs token still noisy.", { predictive: 71, stability: 69, robustness: 72, logic: 76, diversity: 74 }, [], icY(0.01, 0.05, 0.06, 0.03)),
  p("internet-computer", "ICP", "ICP", 70, "#29ABE2", "icp", "Full-stack chain pitch. High narrative volatility.", { predictive: 68, stability: 64, robustness: 67, logic: 72, diversity: 71 }, ["broke on 2022 holdout"], icY(-0.05, 0.06, 0.05, 0.03)),
  p("arbitrum", "ARBITRUM", "ARB", 84, "#28A0F0", "arb", "Leading optimistic rollup. Fee + sequencers matter.", { predictive: 83, stability: 82, robustness: 81, logic: 87, diversity: 79 }, [], icY(0.02, 0.07, 0.08, 0.06)),
  p("optimism", "OPTIMISM", "OP", 83, "#FF0420", "op", "OP Stack gravity. Superchain thesis on trial.", { predictive: 81, stability: 83, robustness: 80, logic: 86, diversity: 77 }, [], icY(0.01, 0.06, 0.07, 0.05)),
  p("sui", "SUI", "SUI", 81, "#4DA2FF", "sui", "Move L1. Short history - stability sample is thin.", { predictive: 82, stability: 68, robustness: 75, logic: 84, diversity: 80 }, ["high IC, unstable sign", "short sample"], icY(0.05, 0.12, 0.08, null)),
  p("aptos", "APTOS", "APT", 80, "#1B1B1B", "apt", "Move peer. Throughput story, still early holdout.", { predictive: 81, stability: 69, robustness: 74, logic: 83, diversity: 79 }, ["short sample"], icY(0.04, 0.1, 0.07, null)),
  p("injective", "INJECTIVE", "INJ", 82, "#00F2FE", "inj", "Exchange / DeFi L1 hybrid. Beta to perps cycle.", { predictive: 83, stability: 74, robustness: 78, logic: 81, diversity: 76 }, [], icY(0.03, 0.09, 0.08, 0.06)),
  p("celestia", "CELESTIA", "TIA", 79, "#7B2BFF", "tia", "Modular DA. Narrative-rich, sample still short.", { predictive: 80, stability: 66, robustness: 72, logic: 85, diversity: 82 }, ["short sample"], icY(0.06, 0.11, 0.07, null)),
  p("sei", "SEI", "SEI", 77, "#9B1C1C", "sei", "Trading-focused L1. Crowded exchange competition.", { predictive: 78, stability: 67, robustness: 73, logic: 79, diversity: 75 }, ["short sample"], icY(0.05, 0.09, 0.06, null)),
  p("maker", "MAKER", "MKR", 88, "#1AAB9B", "mkr", "Stablecoin issuer DNA. Endgame still unfolding.", { predictive: 86, stability: 90, robustness: 87, logic: 91, diversity: 84 }, [], icY(0.05, 0.07, 0.08, 0.07)),
  p("lido", "LIDO", "LDO", 85, "#00A3FF", "ldo", "LSTs leader. Governance + staking share risk.", { predictive: 84, stability: 83, robustness: 82, logic: 88, diversity: 78 }, [], icY(0.04, 0.07, 0.08, 0.06)),
  p("curve", "CURVE", "CRV", 78, "#000000", "crv", "Stables AMM core. Token design is the debate.", { predictive: 76, stability: 77, robustness: 75, logic: 84, diversity: 80 }, [], icY(0.03, 0.05, 0.06, 0.04)),
  p("synthetix", "SYNTHETIX", "SNX", 74, "#00D1FF", "snx", "Synth / perps history. Product surface keeps shifting.", { predictive: 72, stability: 70, robustness: 73, logic: 79, diversity: 77 }, [], icY(0.02, 0.05, 0.05, 0.03)),
  p("compound", "COMPOUND", "COMP", 76, "#00D395", "comp", "Lending OG. Share eroded vs newer venues.", { predictive: 73, stability: 80, robustness: 78, logic: 82, diversity: 71 }, [], icY(0.03, 0.04, 0.05, 0.04)),
  p("sushi", "SUSHISWAP", "SUSHI", 68, "#FA52A0", "sushi", "DEX multi-chain. Brand > current share.", { predictive: 65, stability: 66, robustness: 67, logic: 70, diversity: 72 }, ["strong correlation with momentum"], icY(0.01, 0.04, 0.03, 0.02)),
  p("1inch", "1INCH", "1INCH", 81, "#1B314F", "1inch", "Aggregator routing. Quiet infra alpha.", { predictive: 80, stability: 82, robustness: 80, logic: 85, diversity: 76 }, [], icY(0.04, 0.06, 0.07, 0.05)),
  p("stacks", "STACKS", "STX", 78, "#5546FF", "stx", "Bitcoin L2 / smart contracts on BTC narrative.", { predictive: 79, stability: 72, robustness: 74, logic: 83, diversity: 80 }, [], icY(0.03, 0.08, 0.07, 0.05)),
  p("algorand", "ALGORAND", "ALGO", 71, "#000000", "algo", "Pure PoS L1. Low mindshare vs peers.", { predictive: 69, stability: 76, robustness: 74, logic: 77, diversity: 68 }, [], icY(0.02, 0.03, 0.04, 0.03)),
  p("vechain", "VECHAIN", "VET", 69, "#15AB8E", "vet", "Enterprise supply-chain pitch. Token beta is quiet.", { predictive: 67, stability: 75, robustness: 72, logic: 74, diversity: 66 }, [], icY(0.02, 0.03, 0.03, 0.02)),
  p("theta", "THETA", "THETA", 67, "#2AB8E6", "theta", "Video / edge compute narrative. Niche liquidity.", { predictive: 65, stability: 68, robustness: 66, logic: 71, diversity: 70 }, [], icY(0.01, 0.04, 0.03, 0.02)),
  p("hedera", "HEDERA", "HBAR", 72, "#000000", "hbar", "Hashgraph + council model. Different trust story.", { predictive: 70, stability: 77, robustness: 74, logic: 78, diversity: 69 }, [], icY(0.03, 0.04, 0.05, 0.04)),
  p("flow", "FLOW", "FLOW", 70, "#00EF8B", "flow", "NFT / consumer chain. Post-hype digestion.", { predictive: 68, stability: 71, robustness: 69, logic: 75, diversity: 72 }, [], icY(0.02, 0.05, 0.04, 0.03)),
  p("immutable", "IMMUTABLE", "IMX", 76, "#00D1FF", "imx", "Gaming L2. Depends on title pipeline.", { predictive: 75, stability: 70, robustness: 73, logic: 80, diversity: 77 }, [], icY(0.03, 0.07, 0.06, 0.04)),
  p("fetch", "FETCH.AI", "FET", 74, "#1E1E1E", "fet", "AI agent narrative. Correlation with AI basket.", { predictive: 76, stability: 63, robustness: 70, logic: 72, diversity: 68 }, ["strong correlation with momentum"], icY(0.02, 0.11, 0.08, 0.05)),
  p("the-sandbox", "SANDBOX", "SAND", 66, "#00ADEF", "sand", "Metaverse land. Attention-cycle sensitive.", { predictive: 64, stability: 60, robustness: 65, logic: 68, diversity: 70 }, ["strong correlation with momentum"], icY(-0.02, 0.06, 0.04, 0.02)),
  p("decentraland", "DECENTRALAND", "MANA", 64, "#FF2D55", "mana", "Virtual world. Low velocity since peak cycle.", { predictive: 62, stability: 61, robustness: 63, logic: 67, diversity: 69 }, ["strong correlation with momentum"], icY(-0.03, 0.05, 0.03, 0.02)),
  p("apecoin", "APECOIN", "APE", 63, "#0052FF", "ape", "Culture coin. Brand > fundamentals.", { predictive: 61, stability: 58, robustness: 62, logic: 60, diversity: 71 }, ["high IC, unstable sign"], icY(-0.04, 0.08, 0.05, 0.02)),
  p("eos", "EOS", "EOS", 58, "#000000", "eos", "Legacy L1. Trust + narrative discount.", { predictive: 55, stability: 70, robustness: 68, logic: 60, diversity: 55 }, ["broke on 2022 holdout"], icY(-0.02, 0.02, 0.02, 0.01)),
  p("tezos", "TEZOS", "XTZ", 67, "#2C7DF7", "xtz", "Self-amending L1. Quiet builder niche.", { predictive: 65, stability: 74, robustness: 72, logic: 76, diversity: 64 }, [], icY(0.02, 0.03, 0.04, 0.03)),
  p("bitcoin-cash", "BITCOIN CASH", "BCH", 71, "#8DC351", "bch", "Payments fork. Liquidity island vs BTC.", { predictive: 69, stability: 75, robustness: 74, logic: 70, diversity: 63 }, [], icY(0.03, 0.04, 0.04, 0.03)),
  p("ens", "ENS", "ENS", 79, "#5298FF", "ens", "Naming public good. Fee + identity narrative.", { predictive: 77, stability: 81, robustness: 78, logic: 88, diversity: 75 }, [], icY(0.04, 0.06, 0.07, 0.05)),
  p("gala", "GALA", "GALA", 61, "#000000", "gala", "Gaming entertainment token. High churn risk.", { predictive: 60, stability: 55, robustness: 58, logic: 62, diversity: 66 }, ["high IC, unstable sign"], icY(-0.03, 0.07, 0.04, 0.02)),
  p("axie", "AXIE", "AXS", 60, "#0055D5", "axs", "Play-to-earn pioneer. Post-boom digestion.", { predictive: 58, stability: 57, robustness: 59, logic: 64, diversity: 65 }, ["broke on 2022 holdout"], icY(-0.06, 0.04, 0.03, 0.02)),
  p("fantom", "FANTOM", "FTM", 69, "#1969FF", "ftm", "Sonic transition. Brand reboot in progress.", { predictive: 70, stability: 64, robustness: 67, logic: 73, diversity: 72 }, [], icY(0.01, 0.06, 0.05, 0.04)),
  p("pepe", "PEPE", "PEPE", 59, "#3D9A3D", "pepe", "Meme attention battery. Pure momentum beta.", { predictive: 62, stability: 45, robustness: 50, logic: 40, diversity: 55 }, ["strong correlation with momentum", "high IC, unstable sign"], icY(0.0, 0.15, 0.09, 0.03)),
  p("shiba", "SHIBA INU", "SHIB", 57, "#FFA409", "shib", "Meme + L2 attempts. Crowd beta dominates.", { predictive: 58, stability: 48, robustness: 52, logic: 42, diversity: 56 }, ["strong correlation with momentum"], icY(-0.01, 0.1, 0.06, 0.02)),
];

function icY(a, b, c, d) {
  const rows = [];
  if (a != null) rows.push({ period: "2022", ic: a, rank: round(a * 0.9) });
  if (b != null) rows.push({ period: "2023", ic: b, rank: round(b * 0.9) });
  if (c != null) rows.push({ period: "2024", ic: c, rank: round(c * 0.9) });
  if (d != null) rows.push({ period: "2025", ic: d, rank: round(d * 0.9) });
  return rows;
}
function round(n) {
  return Math.round(n * 100) / 100;
}
function p(id, name, ticker, score, tint, logo, blurb, dims, flags, ic, featured = false) {
  return {
    id,
    name,
    ticker,
    score,
    tint,
    logo: `./assets/icons/${logo}.png`,
    blurb,
    dims,
    flags,
    ic,
    featured,
  };
}

const track = document.getElementById("carouselTrack");
const analysisEl = document.getElementById("analysis");
const suggestEl = document.getElementById("suggest");
const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");

function cardHTML(proj, featuredOverride) {
  const featured = featuredOverride ?? proj.featured;
  return `
    <article class="score-card${featured ? " featured" : ""}" data-id="${proj.id}" style="--tint:${proj.tint}">
      ${featured ? '<div class="featured-badge">FEATURED</div>' : ""}
      <div class="coin">
        <img src="${proj.logo}" alt="${proj.ticker}" width="44" height="44" loading="lazy" onerror="this.style.display='none';this.parentElement.textContent='${proj.ticker[0]}'" />
      </div>
      <h3>${proj.name}</h3>
      <span class="label">Score</span>
      <strong class="num">${proj.score}</strong>
      <button type="button" class="more" data-open="${proj.id}">MORE -></button>
    </article>
  `;
}

function buildCarousel() {
  const loop = [...PROJECTS, ...PROJECTS, ...PROJECTS];
  track.innerHTML = loop
    .map((proj, i) => cardHTML(proj, i % PROJECTS.length === 2))
    .join("");
}

let offset = 0;
let cardW = 168;
const gap = 16;
let timer;

function measure() {
  const card = track.querySelector(".score-card");
  if (card) cardW = card.getBoundingClientRect().width;
}

function setTransform(animate = true) {
  track.style.transition = animate ? "transform 0.55s cubic-bezier(.22,.8,.28,1)" : "none";
  track.style.transform = `translateX(${-offset}px)`;
}

function step(dir = 1) {
  measure();
  const one = cardW + gap;
  const setWidth = PROJECTS.length * one;
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

function renderAnalysis(proj) {
  if (!proj) {
    analysisEl.hidden = true;
    analysisEl.innerHTML = "";
    return;
  }
  const d = proj.dims;
  analysisEl.hidden = false;
  analysisEl.innerHTML = `
    <div class="analysis-head">
      <div class="analysis-title">
        <div class="coin big"><img src="${proj.logo}" alt="${proj.ticker}" width="56" height="56" /></div>
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
      ${bar("Predictive Power 35-40%", d.predictive, proj.tint)}
      ${bar("Temporal Stability 20-25%", d.stability, proj.tint)}
      ${bar("Robustness 15-20%", d.robustness, proj.tint)}
      ${bar("Logic / Interpretability 10-15%", d.logic, proj.tint)}
      ${bar("Diversity ~10%", d.diversity, proj.tint)}
    </div>
    <div class="analysis-grid">
      <div>
        <h4>IC by period</h4>
        <table>
          <thead><tr><th>Period</th><th>IC</th><th>RankIC</th></tr></thead>
          <tbody>
            ${proj.ic
              .map(
                (r) =>
                  `<tr><td>${r.period}</td><td>${r.ic.toFixed(2)}</td><td>${r.rank.toFixed(2)}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div>
        <h4>Red flags</h4>
        ${
          proj.flags.length
            ? `<ul class="flag-list">${proj.flags.map((f) => `<li>${f}</li>`).join("")}</ul>`
            : `<p class="ok">No critical flags on holdout sample.</p>`
        }
        <p class="muted tiny">Demo composite - not live market data. Weights follow the IC + stability first MVP.</p>
      </div>
    </div>
  `;
  analysisEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function bar(label, value, tint) {
  return `
    <div class="bar-row">
      <div class="bar-meta"><span>${label}</span><strong>${value}</strong></div>
      <div class="bar-track"><div class="bar-fill" style="width:${value}%;background:${tint}"></div></div>
    </div>
  `;
}

function renderSuggest(q) {
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
  ).slice(0, 8);
  if (!hits.length) {
    suggestEl.hidden = false;
    suggestEl.innerHTML = `<button type="button" class="suggest-item muted" disabled>No match</button>`;
    return;
  }
  suggestEl.hidden = false;
  suggestEl.innerHTML = hits
    .map(
      (x) =>
        `<button type="button" class="suggest-item" data-pick="${x.id}">
          <span class="suggest-left"><img src="${x.logo}" alt="" width="22" height="22" /><span>${x.name}</span></span>
          <em>${x.score}</em>
        </button>`
    )
    .join("");
}

buildCarousel();
measure();
offset = PROJECTS.length * (cardW + gap);
setTransform(false);
startAuto();

document.querySelector(".car-btn.next").addEventListener("click", () => {
  step(1);
  startAuto();
});
document.querySelector(".car-btn.prev").addEventListener("click", () => {
  step(-1);
  startAuto();
});

track.addEventListener("mouseenter", stopAuto);
track.addEventListener("mouseleave", startAuto);

track.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open]");
  const card = e.target.closest(".score-card");
  const id = btn?.dataset.open || card?.dataset.id;
  if (!id) return;
  const proj = PROJECTS.find((x) => x.id === id);
  if (proj) {
    searchInput.value = proj.name;
    suggestEl.hidden = true;
    renderAnalysis(proj);
  }
});

searchInput.addEventListener("input", () => renderSuggest(searchInput.value));
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const proj = findProject(searchInput.value);
  suggestEl.hidden = true;
  if (!proj) {
    analysisEl.hidden = false;
    analysisEl.innerHTML = `<p class="miss">No project found for "${searchInput.value}". Try BTC, SOL, ARB, PEPE...</p>`;
    return;
  }
  renderAnalysis(proj);
});

suggestEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-pick]");
  if (!btn) return;
  const proj = PROJECTS.find((x) => x.id === btn.dataset.pick);
  if (!proj) return;
  searchInput.value = proj.name;
  suggestEl.hidden = true;
  renderAnalysis(proj);
});

window.addEventListener("resize", () => {
  measure();
  offset = PROJECTS.length * (cardW + gap);
  setTransform(false);
});

/* ---- HOT PROJECTS ---- */
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
      ${bar("Predictive Power (proxy) 30%", d.predictive, tint)}
      ${bar("Temporal Stability (proxy) 20%", d.stability, tint)}
      ${bar("Robustness 25%", d.robustness, tint)}
      ${bar("Logic / Interpretability 15%", d.logic, tint)}
      ${bar("Diversity 10%", d.diversity, tint)}
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
        <p style="margin-top:12px"><a class="inline-link" href="${item.sourceUrl}" target="_blank" rel="noopener">Open source -></a></p>
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
