import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import DonatePage from "./pages/DonatePage.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminDonations from "./pages/AdminDonations.tsx";
import { AdminRoute } from "./components/admin/AdminRoute.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
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
