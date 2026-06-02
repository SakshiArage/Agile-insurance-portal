import { useContext } from "react";
import { AuthContext } from "./authContextInstance";

// Hook used by pages/components to read login state and auth actions.
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
};
