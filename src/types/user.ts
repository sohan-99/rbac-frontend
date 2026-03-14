export type UserRole = "admin" | "manager" | "agent" | "customer";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: "active" | "suspended" | "banned";
  permissions: string[];
};