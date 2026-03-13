import { api } from "@/lib/axios";

export const userService = {
  list() {
    return api.get("/users");
  },
  getById(userId: string) {
    return api.get(`/users/${userId}`);
  },
};