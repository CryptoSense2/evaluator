(() => {
  const KEY = "evaluator-theme";
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const marks = document.querySelectorAll("[data-wordmark]");

  const apply = (theme) => {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
    const src =
      theme === "dark"
        ? "./assets/evaluator-wordmark-dark.png"
        : "./assets/evaluator-wordmark.png";
    marks.forEach((img) => {
      img.src = src;
    });
    if (btn) {
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
      btn.title = theme === "dark" ? "Light" : "Dark";
    }
  };

  const current = root.getAttribute("data-theme") || localStorage.getItem(KEY) || "light";
  apply(current);

  if (btn) {
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
    });
  }
})();
