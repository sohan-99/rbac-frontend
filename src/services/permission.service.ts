import { api } from "@/lib/axios";
import type { UserPermissionEditorData } from "@/types/permission";

export const permissionService = {
  listByUser(userId: string) {
    return api.get<UserPermissionEditorData>(`/users/${userId}/permissions`);
  },
  updateByUser(userId: string, permissions: string[]) {
    return api.put<UserPermissionEditorData>(`/users/${userId}/permissions`, { permissions });
  },
};