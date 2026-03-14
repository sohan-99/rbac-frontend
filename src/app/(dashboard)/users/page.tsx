"use client";

import { useEffect, useMemo, useState } from "react";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { Modal } from "@/components/ui/modal";
import { PERMISSIONS } from "@/constants/permissions";
import { usePermission } from "@/hooks/usePermission";
import { permissionService } from "@/services/permission.service";
import { userService } from "@/services/user.service";
import type { UserPermissionEditorData } from "@/types/permission";
import type { User } from "@/types/user";

export default function UsersPage() {
  const canManageUsers = usePermission(PERMISSIONS.USERS_CREATE);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editorData, setEditorData] = useState<UserPermissionEditorData | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function loadUsers() {
    setLoading(true);
    try {
      const response = await userService.list();
      setUsers(response.data as User[]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadUsers();
  }, []);

  async function openPermissionEditor(user: User) {
    setMessage(null);
    setEditingUser(user);
    const response = await permissionService.listByUser(user.id);
    setEditorData(response.data);
    setSelectedPermissions(response.data.directPermissions);
  }

  function closePermissionEditor() {
    setEditingUser(null);
    setEditorData(null);
    setSelectedPermissions([]);
    setMessage(null);
  }

  function togglePermission(permissionKey: string) {
    setSelectedPermissions((prev) =>
      prev.includes(permissionKey)
        ? prev.filter((item) => item !== permissionKey)
        : [...prev, permissionKey],
    );
  }

  async function savePermissions() {
    if (!editingUser) {
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const response = await permissionService.updateByUser(
        editingUser.id,
        selectedPermissions,
      );
      setEditorData(response.data);
      setSelectedPermissions(response.data.directPermissions);
      await loadUsers();
      setMessage("Permissions updated successfully.");
    } catch (error) {
      setMessage(
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Failed to update permissions.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(userId: string, action: "suspend" | "ban" | "activate") {
    if (action === "suspend") {
      await userService.suspend(userId);
    }
    if (action === "ban") {
      await userService.ban(userId);
    }
    if (action === "activate") {
      await userService.activate(userId);
    }
    await loadUsers();
  }

  const statusPill = useMemo(
    () => ({
      active: "bg-[#eaf7ee] text-[#2f8b57]",
      suspended: "bg-[#fff4e7] text-[#d57a1f]",
      banned: "bg-[#fdeceb] text-[#d8443a]",
    }),
    [],
  );

  return (
    <PermissionGate
      permission={PERMISSIONS.USERS_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Users.</p>}
    >
      <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-[#2f394b]">User Management</h1>
        <p className="text-sm text-[#70788b]">
          Create, edit, suspend, ban, and manage user permissions with grant ceiling.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e2e5ea] bg-white">
        <div className="hidden grid-cols-[1.3fr_1.2fr_0.8fr_0.8fr_1.8fr] border-b border-[#eceef2] bg-[#f8f9fb] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#7f8798] md:grid">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <p className="px-4 py-6 text-sm text-[#7d8495]">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="px-4 py-6 text-sm text-[#7d8495]">No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user.id} className="border-b border-[#f1f2f5] last:border-b-0">
              <div className="space-y-3 px-4 py-4 text-sm text-[#445066] md:hidden">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-[#2f394b]">{user.name}</p>
                    <p className="break-all text-[#6f7788]">{user.email}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                      statusPill[(user.status ?? "active") as "active" | "suspended" | "banned"]
                    }`}
                  >
                    {user.status ?? "active"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#f8f9fb] p-3 text-xs">
                  <div>
                    <p className="mb-1 uppercase tracking-wide text-[#8a91a1]">Role</p>
                    <p className="capitalize text-[#2f394b]">{user.role}</p>
                  </div>
                  <div>
                    <p className="mb-1 uppercase tracking-wide text-[#8a91a1]">Status</p>
                    <p className="capitalize text-[#2f394b]">{user.status ?? "active"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={!canManageUsers}
                    className="rounded-md border border-[#d8dbe2] bg-white px-2.5 py-2 text-xs font-medium text-[#4b5569] hover:bg-[#f6f7f9] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => void openPermissionEditor(user)}
                  >
                    Permissions
                  </button>
                  <button
                    type="button"
                    disabled={!canManageUsers}
                    className="rounded-md border border-[#ead8be] bg-[#fff4e6] px-2.5 py-2 text-xs font-medium text-[#af6b1d] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => void updateStatus(user.id, "suspend")}
                  >
                    Suspend
                  </button>
                  <button
                    type="button"
                    disabled={!canManageUsers}
                    className="rounded-md border border-[#f4cfcf] bg-[#fdeceb] px-2.5 py-2 text-xs font-medium text-[#bd3b34] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => void updateStatus(user.id, "ban")}
                  >
                    Ban
                  </button>
                  <button
                    type="button"
                    disabled={!canManageUsers}
                    className="rounded-md border border-[#cbe6d4] bg-[#eaf7ee] px-2.5 py-2 text-xs font-medium text-[#2c7a4f] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => void updateStatus(user.id, "activate")}
                  >
                    Activate
                  </button>
                </div>
              </div>

              <div className="hidden grid-cols-[1.3fr_1.2fr_0.8fr_0.8fr_1.8fr] items-center px-4 py-3 text-sm text-[#445066] md:grid">
                <span className="font-medium text-[#2f394b]">{user.name}</span>
                <span className="truncate">{user.email}</span>
                <span className="capitalize">{user.role}</span>
                <span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      statusPill[(user.status ?? "active") as "active" | "suspended" | "banned"]
                    }`}
                  >
                    {user.status ?? "active"}
                  </span>
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={!canManageUsers}
                    className="rounded-md border border-[#d8dbe2] bg-white px-2.5 py-1 text-xs font-medium text-[#4b5569] hover:bg-[#f6f7f9] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => void openPermissionEditor(user)}
                  >
                    Permissions
                  </button>
                  <button
                    type="button"
                    disabled={!canManageUsers}
                    className="rounded-md border border-[#ead8be] bg-[#fff4e6] px-2.5 py-1 text-xs font-medium text-[#af6b1d] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => void updateStatus(user.id, "suspend")}
                  >
                    Suspend
                  </button>
                  <button
                    type="button"
                    disabled={!canManageUsers}
                    className="rounded-md border border-[#f4cfcf] bg-[#fdeceb] px-2.5 py-1 text-xs font-medium text-[#bd3b34] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => void updateStatus(user.id, "ban")}
                  >
                    Ban
                  </button>
                  <button
                    type="button"
                    disabled={!canManageUsers}
                    className="rounded-md border border-[#cbe6d4] bg-[#eaf7ee] px-2.5 py-1 text-xs font-medium text-[#2c7a4f] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => void updateStatus(user.id, "activate")}
                  >
                    Activate
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        title={editingUser ? `Permission Editor - ${editingUser.name}` : "Permission Editor"}
        open={Boolean(editingUser && editorData)}
        onClose={closePermissionEditor}
      >
        {editorData ? (
          <div className="space-y-4">
            <p className="text-sm text-[#6f7788]">
              You can only grant permissions you already have (grant ceiling).
            </p>

            <div className="max-h-72 space-y-2 overflow-auto rounded-md border border-[#e3e6eb] p-3">
              {editorData.permissions.map((permission) => {
                const checked = selectedPermissions.includes(permission.key);
                const disabled = !permission.grantable || permission.inherited;

                return (
                  <label
                    key={permission.key}
                    className={`flex flex-col gap-2 rounded-md px-2 py-1.5 sm:flex-row sm:items-center sm:justify-between ${
                      disabled ? "bg-[#f6f7f9]" : "hover:bg-[#f9fafb]"
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#2f394b]">{permission.name}</p>
                      <p className="break-all text-xs text-[#7b8395]">{permission.key}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {permission.inherited ? (
                        <span className="rounded-full bg-[#eef1f5] px-2 py-0.5 text-[10px] font-medium text-[#667086]">
                          inherited
                        </span>
                      ) : null}
                      {!permission.grantable ? (
                        <span className="rounded-full bg-[#fff3ec] px-2 py-0.5 text-[10px] font-medium text-[#cf6b39]">
                          no grant
                        </span>
                      ) : null}
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        checked={checked || permission.inherited}
                        disabled={disabled}
                        onChange={() => togglePermission(permission.key)}
                      />
                    </div>
                  </label>
                );
              })}
            </div>

            {message ? <p className="text-sm text-[#2f7f5f]">{message}</p> : null}

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closePermissionEditor}
                className="rounded-md border border-[#d8dbe2] px-3 py-2 text-sm text-[#4b5569]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void savePermissions()}
                disabled={saving}
                className="rounded-md bg-[#6564ec] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        ) : null}
      </Modal>
      </section>
    </PermissionGate>
  );
}