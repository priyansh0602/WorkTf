import { create } from "zustand";
import type { IUser } from "../types";
import { apiClient } from "../lib/api";

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface UserActions {
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchUser: () => Promise<void>;
  createUser: (data: {
    clerkId: string;
    email: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
}

export const useUserStore = create<UserState & UserActions>((set) => ({
  /* Initial state */
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  /* Actions */
  setUser: (user) => set({ user, isAuthenticated: user !== null }),
  clearUser: () => set({ user: null, isAuthenticated: false }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

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
    set({ isLoading: true, error: null });
    try {
      const user = await apiClient.post<IUser>("users", data);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      set({ error: error.message || "Failed to create user", isLoading: false });
      throw error;
    }
  },
}));
