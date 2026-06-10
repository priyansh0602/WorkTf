import { create } from "zustand";
import type { ICall, IActiveCall } from "../types";
import { apiClient } from "../lib/api";

interface CallStats {
  total: number;
  answered: number;
  missed: number;
  converted: number;
  conversionRate: string;
}

interface CallState {
  activeCall: IActiveCall | null;
  recentCalls: ICall[];
  callStats: CallStats | null;
  isLoading: boolean;
  error: string | null;
}

interface CallActions {
  setActiveCall: (call: IActiveCall | null) => void;
  clearActiveCall: () => void;
  setRecentCalls: (calls: ICall[]) => void;
  addCall: (call: ICall) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchRecentCalls: () => Promise<void>;
  fetchCallStats: () => Promise<void>;
  initiateCall: (contactName: string, contactNumber: string) => Promise<void>;
}

function mapCall(c: any): ICall {
  return {
    id: c.id,
    agentId: c.agent_id,
    userId: c.user_id,
    contactName: c.contact_name,
    contactNumber: c.contact_number,
    direction: c.direction,
    status: c.status,
    outcome: c.outcome,
    duration: c.duration,
    transcript: c.transcript,
    recordingUrl: c.recording_url,
    startedAt: c.started_at ? new Date(c.started_at) : undefined,
    endedAt: c.ended_at ? new Date(c.ended_at) : undefined,
    createdAt: c.created_at ? new Date(c.created_at) : new Date(),
    updatedAt: c.updated_at ? new Date(c.updated_at) : new Date(),
  };
}

function mapActiveCall(c: any): IActiveCall {
  return {
    callId: c.id,
    contactName: c.contact_name,
    contactNumber: c.contact_number,
    direction: c.direction,
    status: c.status,
    startedAt: c.started_at ? new Date(c.started_at) : new Date(),
    durationSeconds: c.duration || 0,
  };
}

export const useCallStore = create<CallState & CallActions>((set) => ({
  /* Initial state */
  activeCall: null,
  recentCalls: [],
  callStats: null,
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

  fetchRecentCalls: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await apiClient.get<{ calls: any[] }>("calls");
      const mapped = (result?.calls || []).map(mapCall);
      set({ recentCalls: mapped, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch calls", isLoading: false });
    }
  },

  fetchCallStats: async () => {
    try {
      const stats = await apiClient.get<CallStats>("calls/stats");
      set({ callStats: stats });
    } catch (error: any) {
      console.error("Failed to fetch call stats:", error);
    }
  },

  initiateCall: async (contactName: string, contactNumber: string) => {
    set({ isLoading: true, error: null });
    try {
      const call = await apiClient.post<any>("calls", {
        contactName,
        contactNumber,
      });
      const activeCall = mapActiveCall(call);
      set({ activeCall, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to initiate call", isLoading: false });
      throw error;
    }
  },
}));
