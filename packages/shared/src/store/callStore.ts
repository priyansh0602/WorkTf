/**
 * Shared Call Store — Zustand store for call state.
 *
 * Lives in packages/shared so both web and mobile apps can
 * import the same store interface and logic.
 */

import { create } from "zustand";
import type { ICall, IActiveCall } from "../types";

// ─── State + Actions ────────────────────────────────────────────────

interface SharedCallState {
  activeCall: IActiveCall | null;
  recentCalls: ICall[];
  isLoading: boolean;
  error: string | null;
}

interface SharedCallActions {
  setActiveCall: (call: IActiveCall | null) => void;
  clearActiveCall: () => void;
  setRecentCalls: (calls: ICall[]) => void;
  addCall: (call: ICall) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// ─── Store ──────────────────────────────────────────────────────────

export const useSharedCallStore = create<SharedCallState & SharedCallActions>(
  (set) => ({
    /* Initial state */
    activeCall: null,
    recentCalls: [],
    isLoading: false,
    error: null,

    /* Actions */
    setActiveCall: (call) => set({ activeCall: call }),
    clearActiveCall: () => set({ activeCall: null }),
    setRecentCalls: (calls) => set({ recentCalls: calls }),
    addCall: (call) =>
      set((state) => ({ recentCalls: [call, ...state.recentCalls] })),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
  }),
);
