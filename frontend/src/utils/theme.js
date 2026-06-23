export const STORAGE_THEME = "agile_insurance_theme_v1";

export const setDocumentTheme = (mode) => {
  const theme = mode === "dark" ? "dark" : "light";
  const html = document.documentElement;

  html.dataset.theme = theme;
  html.classList.toggle("dark", theme === "dark");

  return theme;
};

export const applyStoredTheme = () =>
  setDocumentTheme(localStorage.getItem(STORAGE_THEME) || "light");
