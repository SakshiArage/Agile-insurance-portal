import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

// Authentication Layout - Minimal interface for login/signup
// Features:
// - No navbar or footer (focused experience)
// - Enables scroll-to-top on route change
// - Perfect for OTP verification flow
// - Compact card design to reduce distractions
//
// EDIT: To add navbar/footer to auth pages, import and add them here
const AuthLayout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <ScrollToTop />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
