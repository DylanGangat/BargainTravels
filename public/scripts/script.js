const navToggle = document.querySelector("[data-nav-toggle]");
const overlay = document.querySelector("[data-overlay]");
const nav = document.querySelector("[data-nav]");

navToggle.addEventListener("click", e => {
  if (!e.currentTarget.hasAttribute("data-nav-toggle")) return;
  nav.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

overlay.addEventListener("click", e => {
  if (!e.target.hasAttribute("data-overlay")) return;
  nav.classList.add("hidden");
  overlay.classList.add("hidden");
});
