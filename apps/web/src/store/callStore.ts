/**
 * Call Store — Zustand store managing active call state and call history.
 *
 * Used by dashboard, active call, and call logs pages to share
 * call data across the application.
 */

import { create } from "zustand";
import type { ICall, IActiveCall } from "@worktf/shared";

// ─── State interface ────────────────────────────────────────────────

interface CallState {
  activeCall: IActiveCall | null;
  recentCalls: ICall[];
  isLoading: boolean;
  error: string | null;
}

// ─── Actions interface ──────────────────────────────────────────────

interface CallActions {
  setActiveCall: (call: IActiveCall | null) => void;
  clearActiveCall: () => void;
  setRecentCalls: (calls: ICall[]) => void;
  addCall: (call: ICall) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// ─── Store ──────────────────────────────────────────────────────────

export const useCallStore = create<CallState & CallActions>((set) => ({
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
}));
