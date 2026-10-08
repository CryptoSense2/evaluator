(() => {
  // Paste the live contract address here (EVM 0x… or Solana mint).
  const TOKEN = {
    ticker: "$EVAL",
    ca: "", // e.g. "0x5291d09b0d3821fe226f29376239dde7de282a0b"
  };

  const root = document.getElementById("brandToken");
  const tickerEl = document.getElementById("brandTicker");
  const caBtn = document.getElementById("brandCa");
  if (!root || !tickerEl || !caBtn) return;

  tickerEl.textContent = TOKEN.ticker || "$EVAL";
  root.hidden = false;

  const ca = String(TOKEN.ca || "").trim();
  const ready = Boolean(ca) && ca !== "PASTE_CA" && !ca.startsWith("[");

  if (!ready) {
    caBtn.textContent = "ca soon";
    caBtn.disabled = true;
    caBtn.title = "CA coming soon";
    return;
  }

  const short = ca.length > 14 ? `${ca.slice(0, 6)}…${ca.slice(-4)}` : ca;
  caBtn.disabled = false;
  caBtn.textContent = `ca ${short}`;
  caBtn.dataset.ca = ca;
  caBtn.title = "Copy CA";

  caBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const value = caBtn.dataset.ca || "";
    try {
      await navigator.clipboard.writeText(value);
      const prev = caBtn.textContent;
      caBtn.textContent = "copied";
      setTimeout(() => {
        caBtn.textContent = prev;
      }, 1200);
    } catch (_) {
      window.prompt("CA", value);
    }
  });
})();
