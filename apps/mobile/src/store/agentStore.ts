import { create } from "zustand";
import type { IAgent, IMessagingAgentConfig, ChannelType, MessageChannel } from "../types";
import { apiClient } from "../lib/api";

interface AgentState {
  agent: IAgent | null;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  messagingConfigs: IMessagingAgentConfig[];
  enabledChannels: ChannelType[];
}

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
  fetchAgent: () => Promise<void>;
  saveAgent: (updates: Partial<IAgent>) => Promise<void>;
}

export const useAgentStore = create<AgentState & AgentActions>((set, get) => ({
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

  fetchAgent: async () => {
    set({ isLoading: true, error: null });
    try {
      const agent = await apiClient.get<IAgent>("agents");
      set({ agent, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch agent", isLoading: false });
    }
  },

  saveAgent: async (updates: Partial<IAgent>) => {
    set({ isSaving: true, error: null });
    try {
      const agentId = get().agent?.id;
      if (!agentId) return;
      const updated = await apiClient.patch<IAgent>(`agents/${agentId}`, updates);
      set({ agent: updated, isSaving: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to save agent", isSaving: false });
      throw error;
    }
  },
}));
