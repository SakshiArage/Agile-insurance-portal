import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContextInstance";
import { getToken, setToken } from "../utils/api";

const STORAGE_SESSION = "agile_insurance_session_v1";
const STORAGE_LEGACY = "agile_insurance_auth_v1";
const STORAGE_USERS = "agile_insurance_users_v1";
const STORAGE_PENDING = "agile_insurance_pending_user_v1";
const DEMO_OTP = "123456";

// Auth provider is now frontend-only and stores demo users in localStorage.
const safeJsonParse = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const readUsers = () => safeJsonParse(localStorage.getItem(STORAGE_USERS), []);

const writeUsers = (users) => {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
};

const saveSession = (nextUser) => {
  setToken(`frontend_demo_${Date.now()}`);
  localStorage.setItem(STORAGE_SESSION, JSON.stringify({ user: nextUser }));
};

const bootstrapUser = () => {
  const legacy = localStorage.getItem(STORAGE_LEGACY);
  if (legacy) {
    const parsed = safeJsonParse(legacy, null);
    if (parsed?.user) {
      localStorage.setItem(STORAGE_SESSION, JSON.stringify({ user: parsed.user }));
    }
    localStorage.removeItem(STORAGE_LEGACY);
  }

  if (!getToken()) return null;
  const sessionRaw = localStorage.getItem(STORAGE_SESSION);
  const sessionParsed = sessionRaw ? safeJsonParse(sessionRaw, null) : null;
  return sessionParsed?.user ?? null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => bootstrapUser());
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    setBootstrapped(true);
  }, []);

  const register = async ({ fullName, email, phone, password }) => {
    const users = readUsers();
    if (users.some((u) => u.email === email)) {
      throw new Error("An account with this email already exists.");
    }

    localStorage.setItem(
      STORAGE_PENDING,
      JSON.stringify({
        id: `usr_${Date.now()}`,
        fullName,
        email,
        phone,
        password,
        createdAt: new Date().toISOString(),
      }),
    );

    return { message: `Demo OTP is ${DEMO_OTP}. Enter it below to verify your account.` };
  };

  const verifyOtp = async ({ email, otp }) => {
    const pending = safeJsonParse(localStorage.getItem(STORAGE_PENDING), null);
    if (!pending || pending.email !== email) throw new Error("No pending registration found for this email.");
    if (otp !== DEMO_OTP) throw new Error("Invalid OTP. Use 123456 for this frontend demo.");

    const users = readUsers();
    const verifiedUser = {
      id: pending.id,
      fullName: pending.fullName,
      email: pending.email,
      phone: pending.phone,
      createdAt: pending.createdAt,
    };

    writeUsers([...users, { ...verifiedUser, password: pending.password }]);
    localStorage.removeItem(STORAGE_PENDING);
    saveSession(verifiedUser);
    setUser(verifiedUser);
    return verifiedUser;
  };

  const login = async ({ email, password }) => {
    const users = readUsers();
    const match = users.find((u) => u.email === email && u.password === password);
    if (!match) throw new Error("Invalid email or password.");

    const loggedInUser = {
      id: match.id,
      fullName: match.fullName,
      email: match.email,
      phone: match.phone,
      createdAt: match.createdAt,
    };

    saveSession(loggedInUser);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const googleLogin = async () => {
    const googleUser = {
      id: `google_${Date.now()}`,
      fullName: "Google User",
      email: "google-user@agileclaim.demo",
      phone: "",
      createdAt: new Date().toISOString(),
    };
    saveSession(googleUser);
    setUser(googleUser);
    return googleUser;
  };

  const logout = () => {
    setToken("");
    localStorage.removeItem(STORAGE_SESSION);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      bootstrapped,
      register,
      verifyOtp,
      login,
      googleLogin,
      logout,
    }),
    [bootstrapped, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
