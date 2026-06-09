// Local-storage helpers used by demo checkout/dashboard data.
const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const ns = (key) => `agile_insurance_${key}_v1`;

export const load = (key, fallback) => {
  const raw = localStorage.getItem(ns(key));
  if (!raw) return fallback;
  return safeJsonParse(raw, fallback);
};

export const save = (key, value) => {
  localStorage.setItem(ns(key), JSON.stringify(value));
};

export const uid = (prefix) => `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
