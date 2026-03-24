/**
 * Shared theme toggle behavior for SafeCloak pages.
 * Requires a button with id="theme-toggle".
 */
(function () {
  function shouldUseDarkTheme() {
    try {
      return (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    } catch (error) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  }

  function applyInitialTheme() {
    document.documentElement.classList.toggle("dark", shouldUseDarkTheme());
  }

  function persistThemePreference(isDark) {
    try {
      localStorage.theme = isDark ? "dark" : "light";
    } catch (error) {
      // Ignore storage write failures (privacy mode/disabled storage).
    }
  }

  function initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    if (!themeToggle) return;

    const syncThemeToggleState = () => {
      themeToggle.setAttribute("aria-pressed", html.classList.contains("dark") ? "true" : "false");
    };

    syncThemeToggleState();
    themeToggle.addEventListener("click", () => {
      html.classList.toggle("dark");
      persistThemePreference(html.classList.contains("dark"));
      syncThemeToggleState();
    });
  }

  applyInitialTheme();
  document.addEventListener("DOMContentLoaded", initThemeToggle);

  window.applyInitialTheme = applyInitialTheme;
  window.initThemeToggle = initThemeToggle;
})();
