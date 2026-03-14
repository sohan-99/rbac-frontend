import { api } from "@/lib/axios";

export const userService = {
  list() {
    return api.get("/users");
  },
  getById(userId: string) {
    return api.get(`/users/${userId}`);
  },
  suspend(userId: string) {
    return api.patch(`/users/${userId}/suspend`);
  },
  ban(userId: string) {
    return api.patch(`/users/${userId}/ban`);
  },
  activate(userId: string) {
    return api.patch(`/users/${userId}/activate`);
  },
};