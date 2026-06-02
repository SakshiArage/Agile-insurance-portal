import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PublicLayout from "./layouts/PublicLayout";
import AuthPage from "./pages/AuthPage";
import CategoryPage from "./pages/CategoryPage";
import PolicyDetailsPage from "./pages/PolicyDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardPolicies from "./pages/dashboard/DashboardPolicies";
import DashboardClaims from "./pages/dashboard/DashboardClaims";
import DashboardPayments from "./pages/dashboard/DashboardPayments";
import DashboardRenewals from "./pages/dashboard/DashboardRenewals";
import DashboardDocuments from "./pages/dashboard/DashboardDocuments";
import DashboardContact from "./pages/dashboard/DashboardContact";
import DashboardNotifications from "./pages/dashboard/DashboardNotifications";
import DashboardProfile from "./pages/dashboard/DashboardProfile";
import DashboardSecurity from "./pages/dashboard/DashboardSecurity";
import NotFoundPage from "./pages/NotFoundPage";

// Route table for public pages, protected checkout/success pages, and dashboard sections.
// Add or rename URLs here when changing the frontend navigation structure.
const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/:categorySlug" element={<CategoryPage />} />
        <Route path="/policies/:policyId" element={<PolicyDetailsPage />} />
        <Route
          path="/checkout/:policyId"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/success"
          element={
            <ProtectedRoute>
              <PaymentSuccessPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverview />} />
        <Route path="policies" element={<DashboardPolicies />} />
        <Route path="claims" element={<DashboardClaims />} />
        <Route path="payments" element={<DashboardPayments />} />
        <Route path="renewals" element={<DashboardRenewals />} />
        <Route path="documents" element={<DashboardDocuments />} />
        <Route path="contact" element={<DashboardContact />} />
        <Route path="ai-support" element={<Navigate to="/dashboard/contact" replace />} />
        <Route path="notifications" element={<DashboardNotifications />} />
        <Route path="profile" element={<DashboardProfile />} />
        <Route path="security" element={<DashboardSecurity />} />
      </Route>

      <Route path="/app" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
