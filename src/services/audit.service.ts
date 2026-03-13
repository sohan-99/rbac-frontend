import { api } from "@/lib/axios";

export const auditService = {
  list() {
    return api.get("/audit-log");
  },
};