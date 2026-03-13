import { api } from "@/lib/axios";

export const permissionService = {
  listByUser(userId: string) {
    return api.get(`/users/${userId}/permissions`);
  },
  updateByUser(userId: string, permissions: string[]) {
    return api.put(`/users/${userId}/permissions`, { permissions });
  },
};