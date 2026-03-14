import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types/user";

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  user: User;
};

export const authService = {
  signup(payload: SignupPayload) {
    return api.post<ApiResponse<LoginResponse>>('/auth/signup', payload);
  },
  login(payload: LoginPayload) {
    return api.post<ApiResponse<LoginResponse>>("/auth/login", payload);
  },
  logout() {
    return api.post<ApiResponse<null>>("/auth/logout");
  },
  refresh() {
    return api.post<ApiResponse<{ accessToken: string }>>("/auth/refresh");
  },
  me(accessToken?: string) {
    return api.get<ApiResponse<User>>(
      "/auth/me",
      accessToken
        ? {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        : undefined,
    );
  },
};