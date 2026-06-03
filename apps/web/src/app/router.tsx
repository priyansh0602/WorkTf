/**
 * Application router — all routes for WorkTF AI web app.
 *
 * Uses nested routing with an Outlet-based DashboardLayout
 * that wraps all /dashboard/* routes in the AppLayout shell.
 * The useActivePage hook syncs the sidebar highlight with the URL.
 */

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { LandingPage } from "@components/landing";
import { OnboardingFlow } from "@components/onboarding";
import { DashboardPage } from "@components/dashboard";
import { ActiveCallPage } from "@components/active-call";
import { CallLogsPage } from "@components/call-logs";
import { AgentConfigPage } from "@components/agent-config";
import { SettingsPage } from "@components/settings";
import AppLayout from "@components/layout/AppLayout";
import { useActivePage } from "@hooks/useActivePage";

// ─── Router entry ───────────────────────────────────────────────────

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

// ─── Route definitions ──────────────────────────────────────────────

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

      {/* ── Dashboard routes (nested inside AppLayout) ── */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={
            <DashboardPage
              onStartCall={() => navigate("/dashboard/active-call")}
              onViewAllCalls={() => navigate("/dashboard/call-logs")}
              onManageAgent={() => navigate("/dashboard/agent-config")}
            />
          }
        />
        <Route
          path="active-call"
          element={
            <ActiveCallPage onEndCall={() => navigate("/dashboard")} />
          }
        />
        <Route path="call-logs" element={<CallLogsPage />} />
        <Route path="agent-config" element={<AgentConfigPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

// ─── Dashboard layout wrapper ───────────────────────────────────────

/**
 * DashboardLayout — Wraps child routes in AppLayout with
 * sidebar navigation synced to the URL via useActivePage.
 */
function DashboardLayout() {
  const { activePage, navigate } = useActivePage();

  return (
    <AppLayout activePage={activePage} onNavigate={navigate}>
      <Outlet />
    </AppLayout>
  );
}
