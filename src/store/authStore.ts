"use client";

import { create } from "zustand";
import type { User } from "@/types/user";

type AuthState = {
  accessToken: string | null;
  user: User | null;
  setAuth: (payload: { accessToken: string; user: User }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  setAuth: ({ accessToken, user }) => {
    set({ accessToken, user });
  },
  clearAuth: () => {
    set({ accessToken: null, user: null });
  },
}));