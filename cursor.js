(() => {
  const touchOnly =
    window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(hover: hover)").matches;
  if (touchOnly) return;

  document.querySelectorAll(".cursor-glow, .cursor-dot, .cursor-ring, .cursor-fx").forEach((el) => el.remove());

  const root = document.createElement("div");
  root.className = "cursor-fx";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <div class="cursor-fx__bloom"></div>
    <div class="cursor-fx__orbit">
      <div class="cursor-fx__orbit-spin">
        <span class="cursor-fx__spark"></span>
      </div>
    </div>
    <div class="cursor-fx__core"></div>
  `;
  document.body.appendChild(root);

  const bloom = root.querySelector(".cursor-fx__bloom");
  const orbit = root.querySelector(".cursor-fx__orbit");
  const core = root.querySelector(".cursor-fx__core");

  document.body.classList.add("has-custom-cursor");

  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 2;
  let x = tx;
  let y = ty;
  let ox = tx;
  let oy = ty;
  let visible = false;

  const tick = () => {
    x += (tx - x) * 0.32;
    y += (ty - y) * 0.32;
    ox += (tx - ox) * 0.18;
    oy += (ty - oy) * 0.18;

    const show = visible ? "1" : "0";
    core.style.opacity = show;
    orbit.style.opacity = show;
    bloom.style.opacity = visible ? "1" : "0";

    core.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    orbit.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
    bloom.style.transform = `translate3d(${x}px, ${y}px, 0)`;

    requestAnimationFrame(tick);
  };

  window.addEventListener(
    "pointermove",
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      visible = true;
    },
    { passive: true }
  );

  window.addEventListener(
    "pointerleave",
    () => {
      visible = false;
    },
    { passive: true }
  );

  document.addEventListener(
    "pointerover",
    (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("a, button, .score-card, .hot-card, .suggest-item, .car-btn, .btn-theme, input, .more")) {
        document.body.classList.add("is-hovering");
      } else {
        document.body.classList.remove("is-hovering");
      }
    },
    { passive: true }
  );

  requestAnimationFrame(tick);
})();
