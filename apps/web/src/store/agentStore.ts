/**
 * Agent Store — Zustand store managing the AI agent configuration.
 *
 * Used by agent config page and dashboard status card to track
 * the current agent state and save progress.
 */

import { create } from "zustand";
import type { IAgent } from "@worktf/shared";

// ─── State interface ────────────────────────────────────────────────

interface AgentState {
  agent: IAgent | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

// ─── Actions interface ──────────────────────────────────────────────

interface AgentActions {
  setAgent: (agent: IAgent | null) => void;
  updateAgent: (updates: Partial<IAgent>) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
}

// ─── Store ──────────────────────────────────────────────────────────

export const useAgentStore = create<AgentState & AgentActions>((set) => ({
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
}));
