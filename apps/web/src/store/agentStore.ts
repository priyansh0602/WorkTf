/**
 * Agent Store — Zustand store managing the AI agent configuration.
 *
 * Used by agent config page and dashboard status card to track
 * the current agent state, messaging configs, and enabled channels.
 */

import { create } from "zustand";
import type { IAgent, IMessagingAgentConfig, ChannelType, MessageChannel } from "@worktf/shared";

// ─── State interface ────────────────────────────────────────────────

interface AgentState {
  agent: IAgent | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  messagingConfigs: IMessagingAgentConfig[];
  enabledChannels: ChannelType[];
}

// ─── Actions interface ──────────────────────────────────────────────

interface AgentActions {
  setAgent: (agent: IAgent | null) => void;
  updateAgent: (updates: Partial<IAgent>) => void;
  setLoading: (loading: boolean) => void;
  setSaving: (saving: boolean) => void;
  setError: (error: string | null) => void;
  setMessagingConfigs: (configs: IMessagingAgentConfig[]) => void;
  updateMessagingConfig: (channel: MessageChannel, updates: Partial<IMessagingAgentConfig>) => void;
  setEnabledChannels: (channels: ChannelType[]) => void;
  toggleChannel: (channel: ChannelType) => void;
}

// ─── Store ──────────────────────────────────────────────────────────

export const useAgentStore = create<AgentState & AgentActions>((set) => ({
  /* Initial state */
  agent: null,
  isLoading: false,
  isSaving: false,
  error: null,
  messagingConfigs: [],
  enabledChannels: [],

  /* Actions */
  setAgent: (agent) => set({ agent }),
  updateAgent: (updates) =>
    set((state) => ({
      agent: state.agent ? { ...state.agent, ...updates } : null,
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setSaving: (saving) => set({ isSaving: saving }),
  setError: (error) => set({ error }),
  setMessagingConfigs: (configs) => set({ messagingConfigs: configs }),
  updateMessagingConfig: (channel, updates) =>
    set((state) => ({
      messagingConfigs: state.messagingConfigs.map((c) =>
        c.channel === channel ? { ...c, ...updates } : c,
      ),
    })),
  setEnabledChannels: (channels) => set({ enabledChannels: channels }),
  toggleChannel: (channel) =>
    set((state) => ({
      enabledChannels: state.enabledChannels.includes(channel)
        ? state.enabledChannels.filter((c) => c !== channel)
        : [...state.enabledChannels, channel],
    })),
}));
