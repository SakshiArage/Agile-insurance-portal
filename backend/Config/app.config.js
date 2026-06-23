const normalizeEnvValue = (value) =>
  typeof value === "string" ? value.trim().replace(/^['"]+|['";]+$/g, "").trim() : value;

const parseUrlList = (value, fallback) => {
  const normalized = normalizeEnvValue(value);
  if (!normalized) return fallback;

  return normalized
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);
};

const appConfig = {
  get port() {
    return Number.parseInt(process.env.PORT, 10) || 3000;
  },
  get mongoUri() {
    return process.env.MONGO_URI;
  },
  get jwtSecret() {
    return normalizeEnvValue(process.env.JWT_SECRET || process.env.JWT_TOKEN);
  },
  get jwtExpiresIn() {
    return normalizeEnvValue(process.env.JWT_EXPIRES_IN || process.env.JWT_TOKEN_EXPIREY || "1d") || "1d";
  },
  get clientUrl() {
    return parseUrlList(process.env.CLIENT_URL, [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://agile-insurance-portal.vercel.app",
      "https://agile-insurance-portal-ten.vercel.app",
    ]);
  },
};

module.exports = appConfig;
