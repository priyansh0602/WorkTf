/**
 * User Store — Zustand store managing authenticated user data.
 *
 * Tracks the current user profile, authentication state,
 * and loading/error flags for auth operations.
 */

import { create } from "zustand";
import type { IUser } from "@worktf/shared";

// ─── State interface ────────────────────────────────────────────────

interface UserState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ─── Actions interface ──────────────────────────────────────────────

interface UserActions {
  setUser: (user: IUser | null) => void;
  clearUser: () => void;
  setAuthenticated: (value: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// ─── Store ──────────────────────────────────────────────────────────

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
}));
