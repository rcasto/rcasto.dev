function initTheme() {
  if (document.documentElement.dataset.theme) return;
  const saved = localStorage.getItem("theme");
  const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  document.documentElement.dataset.theme = saved || preferred;
}

function updateToggleButton(button) {
  const isDark = document.documentElement.dataset.theme === "dark";
  button.textContent = isDark ? "☀️" : "🌙";
  button.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
}

function createThemeToggle() {
  const button = document.createElement("button");
  button.className = "theme-toggle";
  updateToggleButton(button);
  button.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    updateToggleButton(button);
  });
  document.body.appendChild(button);
}

initTheme();
createThemeToggle();
