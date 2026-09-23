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

function bar(label, value, tint) {
  return `
    <div class="bar-row">
      <div class="bar-meta"><span>${label}</span><strong>${value}</strong></div>
      <div class="bar-track"><div class="bar-fill" style="width:${value}%;background:${tint}"></div></div>
    </div>
  `;
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
          <p>${item.type || "Deal"} - ${item.when || "TBA"} - ${item.source}</p>
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
          <p class="hot-raise">${fmtRaise(item.raiseUsd)} - ${item.when || "TBA"}</p>
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
      const stamp = data.updatedAt
        ? data.updatedAt.replace("T", " ").slice(0, 19) + " UTC"
        : "";
      hotUpdated.textContent = stamp
        ? `Feed refreshed ${stamp} - ${HOT.length} projects scored`
        : `${HOT.length} projects scored`;
    }
    renderHotGrid(HOT);
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
