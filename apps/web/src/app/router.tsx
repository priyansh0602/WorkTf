import { BrowserRouter, Routes, Route } from "react-router-dom";

/**
 * Application router.
 *
 * Placeholder routes for the three top-level pages.
 * These will be replaced with real components in later phases.
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<div>Landing</div>} />

        {/* Post-signup onboarding flow */}
        <Route path="/onboarding" element={<div>Onboarding</div>} />

        {/* Authenticated dashboard */}
        <Route path="/dashboard" element={<div>Dashboard</div>} />
      </Routes>
    </BrowserRouter>
  );
}
