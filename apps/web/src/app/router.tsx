import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LandingPage } from "@components/landing";

/**
 * Application router.
 *
 * The "/" route renders the full landing page.
 * Onboarding and dashboard are placeholders until later phases.
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

/** Inner routes — must be inside BrowserRouter to use useNavigate. */
function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Public landing page */}
      <Route
        path="/"
        element={<LandingPage onGetStarted={() => navigate("/onboarding")} />}
      />

      {/* Post-signup onboarding flow */}
      <Route path="/onboarding" element={<div>Onboarding</div>} />

      {/* Authenticated dashboard */}
      <Route path="/dashboard" element={<div>Dashboard</div>} />
    </Routes>
  );
}

