import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { User } from "@/types/user";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export const authService = {
  login(payload: LoginPayload) {
    return api.post<ApiResponse<LoginResponse>>("/auth/login", payload);
  },
  logout() {
    return api.post<ApiResponse<null>>("/auth/logout");
  },
  refresh() {
    return api.post<ApiResponse<{ accessToken: string }>>("/auth/refresh");
  },
  me() {
    return api.get<ApiResponse<User>>("/auth/me");
  },
};