"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";

type AuthBootstrapProps = {
  children: ReactNode;
};

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  const initialized = useAuthStore((state) => state.initialized);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      const state = useAuthStore.getState();
      if (state.initialized || state.accessToken) {
        state.markInitialized();
        return;
      }

      try {
        const refreshResponse = await authService.refresh();
        const accessToken = refreshResponse.data.data.accessToken;
        const meResponse = await authService.me(accessToken);
        const user = meResponse.data.data;

        if (!active) {
          return;
        }

        useAuthStore.getState().setAuth({ accessToken, user });
      } catch {
        if (!active) {
          return;
        }

        useAuthStore.getState().clearAuth();
      } finally {
        if (active) {
          useAuthStore.getState().markInitialized();
        }
      }
    }

    void restoreSession();

    return () => {
      active = false;
    };
  }, []);

  if (!initialized) {
    return (
      <div className="grid min-h-screen place-items-center bg-white text-sm text-[#6f7788]">
        Restoring session...
      </div>
    );
  }

  return <>{children}</>;
}
