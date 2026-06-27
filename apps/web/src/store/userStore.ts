import { create } from "zustand";
import type { IUser } from "@worktf/shared";
import { apiClient } from "../lib/api";

// ─── State interface ────────────────────────────────────────────────

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasSession: boolean;
  error: string | null;
}

// ─── Actions interface ──────────────────────────────────────────────

interface UserActions {
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  startSession: () => void;
  fetchUser: () => Promise<void>;
  createUser: (data: {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
}

// ─── Store ──────────────────────────────────────────────────────────

export const useUserStore = create<UserState & UserActions>((set) => ({
  /* Initial state */
  user: null,
  isAuthenticated: false,
  isLoading: false,
  hasSession: typeof window !== 'undefined' && !!sessionStorage.getItem('worktf_session'),
  error: null,

  /* Actions */
  setUser: (user) => set({ user, isAuthenticated: user !== null }),
  clearUser: () => {
    sessionStorage.removeItem('worktf_session');
    sessionStorage.removeItem('worktf_clerk_id');
    set({ user: null, isAuthenticated: false, hasSession: false });
  },
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  startSession: () => {
    sessionStorage.setItem('worktf_session', '1');
    set({ hasSession: true });
  },

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await apiClient.get<IUser>("users/me");
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ user: null, isAuthenticated: false, error: error.message, isLoading: false });
    }
  },

  createUser: async (data: {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
  }) => {
    set({ error: null });
    try {
      const user = await apiClient.post<IUser>("users", data);
      set({ user, isAuthenticated: true });
    } catch (error: any) {
      set({ error: error.message || "Failed to create user" });
      throw error;
    }
  },
}));
