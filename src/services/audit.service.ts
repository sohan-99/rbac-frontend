import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";
import type { AuditLogItem } from "@/types/audit";

export const auditService = {
  list(limit = 50) {
    return api.get<ApiResponse<AuditLogItem[]>>("/audit-log", {
      params: { limit },
    });
  },
};