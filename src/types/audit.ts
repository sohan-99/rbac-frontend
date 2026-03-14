export type AuditActor = {
  id: string;
  name: string;
  email: string;
};

export type AuditLogItem = {
  id: string;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: string;
  user: AuditActor | null;
};
