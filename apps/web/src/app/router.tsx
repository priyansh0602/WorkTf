/**
 * Application router — all routes for WorkTF AI web app.
 *
 * Public routes: "/" (landing), "/onboarding" (wizard).
 * Authenticated routes wrapped in AppLayout:
 * "/dashboard", "/dashboard/active-call", "/dashboard/call-logs",
 * "/dashboard/agent-config", "/dashboard/settings".
 */

import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { LandingPage } from "@components/landing";
import { OnboardingFlow } from "@components/onboarding";
import { DashboardPage } from "@components/dashboard";
import { ActiveCallPage } from "@components/active-call";
import { CallLogsPage } from "@components/call-logs";
import { AgentConfigPage } from "@components/agent-config";
import { SettingsPage } from "@components/settings";
import AppLayout from "@components/layout/AppLayout";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

/** Inner routes — must be inside BrowserRouter to use hooks. */
function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* ── Public routes ──────────────────────────── */}
      <Route
        path="/"
        element={<LandingPage onGetStarted={() => navigate("/onboarding")} />}
      />
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

      {/* ── Dashboard routes (inside AppLayout) ───── */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <DashboardPage
              onStartCall={() => navigate("/dashboard/active-call")}
              onViewAllCalls={() => navigate("/dashboard/call-logs")}
              onManageAgent={() => navigate("/dashboard/agent-config")}
            />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/active-call"
        element={
          <DashboardLayout>
            <ActiveCallPage onEndCall={() => navigate("/dashboard")} />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/call-logs"
        element={
          <DashboardLayout>
            <CallLogsPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/agent-config"
        element={
          <DashboardLayout>
            <AgentConfigPage />
          </DashboardLayout>
        }
      />
      <Route
        path="/dashboard/settings"
        element={
          <DashboardLayout>
            <SettingsPage />
          </DashboardLayout>
        }
      />
    </Routes>
  );
}

/**
 * DashboardLayout — Wraps children in AppLayout with navigation.
 * Derives activePage from the current URL path segment.
 */
function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  /** Extract active page from path: "/dashboard/call-logs" → "call-logs" */
  const segments = location.pathname.split("/").filter(Boolean);
  const activePage = segments[1] ?? "dashboard";

  return (
    <AppLayout
      activePage={activePage}
      onNavigate={(page) =>
        navigate(page === "dashboard" ? "/dashboard" : `/dashboard/${page}`)
      }
    >
      {children}
    </AppLayout>
  );
}
