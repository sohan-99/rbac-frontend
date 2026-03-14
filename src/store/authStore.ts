"use client";

import { create } from "zustand";
import type { User } from "@/types/user";

type AuthState = {
  accessToken: string | null;
  user: User | null;
  initialized: boolean;
  setAuth: (payload: { accessToken: string; user: User }) => void;
  clearAuth: () => void;
  markInitialized: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  initialized: false,
  setAuth: ({ accessToken, user }) => {
    set({ accessToken, user, initialized: true });
  },
  clearAuth: () => {
    set({ accessToken: null, user: null, initialized: true });
  },
  markInitialized: () => {
    set({ initialized: true });
  },
}));