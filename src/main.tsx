import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import DonatePage from "./pages/DonatePage.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDonations from "./pages/AdminDonations.tsx";
import AdminResetPassword from "./pages/AdminResetPassword.tsx";
import { AdminRoute } from "./components/admin/AdminRoute.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/reset-password" element={<AdminResetPassword />} />
      <Route
        path="/admin/donations"
        element={
          <AdminRoute>
            <AdminDonations />
          </AdminRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
