/**
 * Shared Agent Store — Zustand store for agent configuration.
 *
 * Lives in packages/shared so both web and mobile apps can
 * import the same store interface and logic.
 */

import { create } from "zustand";
import type { IAgent } from "../types";

// ─── State + Actions ────────────────────────────────────────────────

interface SharedAgentState {
  agent: IAgent | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

interface SharedAgentActions {
  setAgent: (agent: IAgent | null) => void;
  updateAgent: (updates: Partial<IAgent>) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
}

// ─── Store ──────────────────────────────────────────────────────────

export const useSharedAgentStore = create<SharedAgentState & SharedAgentActions>(
  (set) => ({
    /* Initial state */
    agent: null,
    isLoading: false,
    isSaving: false,
    error: null,

    /* Actions */
    setAgent: (agent) => set({ agent }),
    updateAgent: (updates) =>
      set((state) => ({
        agent: state.agent ? { ...state.agent, ...updates } : null,
      })),
    setLoading: (loading) => set({ isLoading: loading }),
    setSaving: (saving) => set({ isSaving: saving }),
    setError: (error) => set({ error }),
  }),
);
