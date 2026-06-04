/**
 * useActivePage — Hook that syncs active nav page with the URL.
 *
 * Derives the active sidebar page from the current pathname
 * and provides a navigate function that maps page IDs to routes.
 */

import { useMemo, useCallback } from "react";
import { useLocation, useNavigate as useRouterNavigate } from "react-router-dom";

interface UseActivePageReturn {
  /** Current page ID derived from URL */
  activePage: string;
  /** Navigate to a page by its sidebar ID */
  navigate: (page: string) => void;
}

/** Maps page IDs to their full route paths. */
const PAGE_TO_PATH: Record<string, string> = {
  dashboard: "/dashboard",
  "active-call": "/dashboard/active-call",
  whatsapp: "/dashboard/whatsapp",
  instagram: "/dashboard/instagram",
  email: "/dashboard/email",
  "call-logs": "/dashboard/call-logs",
  "agent-config": "/dashboard/agent-config",
  settings: "/dashboard/settings",
};

export function useActivePage(): UseActivePageReturn {
  const location = useLocation();
  const routerNavigate = useRouterNavigate();

  /** Derive active page from pathname segments. */
  const activePage = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    // "/dashboard/call-logs" → ["dashboard", "call-logs"] → "call-logs"
    // "/dashboard" → ["dashboard"] → "dashboard"
    return segments[1] ?? "dashboard";
  }, [location.pathname]);

  /** Navigate to a page by its sidebar ID. */
  const navigate = useCallback(
    (page: string) => {
      const path = PAGE_TO_PATH[page] ?? "/dashboard";
      routerNavigate(path);
    },
    [routerNavigate],
  );

  return { activePage, navigate };
}
