(() => {
  // Paste the live contract address here (EVM 0x… or Solana mint).
  const TOKEN = {
    ticker: "$EVAL",
    ca: "", // paste full CA next
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

  // Full address as visible text (no truncation).
  caBtn.disabled = false;
  caBtn.textContent = ca;
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
