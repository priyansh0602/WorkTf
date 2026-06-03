import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LandingPage } from "@components/landing";
import { OnboardingFlow } from "@components/onboarding";

/**
 * Application router.
 *
 * "/" renders the landing page, "/onboarding" the wizard flow.
 * Dashboard is a placeholder until a later phase.
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
      <Route
        path="/onboarding"
        element={
          <OnboardingFlow
            onComplete={(answers) => {
              console.log("Onboarding complete:", answers);
              navigate("/dashboard");
            }}
          />
        }
      />

      {/* Authenticated dashboard */}
      <Route path="/dashboard" element={<div>Dashboard</div>} />
    </Routes>
  );
}
