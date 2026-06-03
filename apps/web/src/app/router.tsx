import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { LandingPage } from "@components/landing";
import { OnboardingFlow } from "@components/onboarding";
import { DashboardPage } from "@components/dashboard";
import AppLayout from "@components/layout/AppLayout";

/**
 * Application router.
 *
 * "/" renders the landing page, "/onboarding" the wizard,
 * "/dashboard" the main dashboard inside the app layout shell.
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
      <Route
        path="/dashboard"
        element={
          <AppLayout activePage="dashboard" onNavigate={(p) => navigate(`/${p}`)}>
            <DashboardPage
              onStartCall={() => console.log("Start call")}
              onViewAllCalls={() => navigate("/call-logs")}
              onManageAgent={() => navigate("/agent-config")}
            />
          </AppLayout>
        }
      />
    </Routes>
  );
}

