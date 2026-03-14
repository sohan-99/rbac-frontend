"use client";

import { useEffect, useState } from "react";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";
import { useAuth } from "@/hooks/useAuth";

type Preferences = {
  workspaceLabel: string;
  emailAlerts: boolean;
  weeklyDigest: boolean;
};

const PREFERENCES_KEY = "rbac.settings.preferences";

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>({
    workspaceLabel: "Primary Workspace",
    emailAlerts: true,
    weeklyDigest: true,
  });

  useEffect(() => {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as Preferences;
      setPreferences(parsed);
    } catch {
      // Ignore invalid persisted value.
    }
  }, []);

  function savePreferences() {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  }

  return (
    <PermissionGate
      permission={PERMISSIONS.SETTINGS_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Settings.</p>}
    >
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2f394b]">Settings</h1>
          <p className="text-sm text-[#70788b]">
            Manage workspace preferences and delivery options.
          </p>
        </div>

        <article className="grid gap-4 rounded-xl border border-[#e1e4ea] bg-white p-4 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#8a92a4]">Current account</p>
            <p className="mt-1 text-base font-semibold text-[#2f394b]">{user?.name ?? "Unknown"}</p>
            <p className="text-sm text-[#6f7788]">{user?.email ?? "No email"}</p>
            <p className="mt-1 inline-block rounded-full bg-[#eef1f6] px-2 py-0.5 text-xs text-[#5f6980]">
              {user?.role ?? "no-role"}
            </p>
          </div>

          <div className="space-y-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-[#3c4558]">Workspace Label</span>
              <input
                type="text"
                value={preferences.workspaceLabel}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    workspaceLabel: event.target.value,
                  }))
                }
                className="h-10 w-full rounded-lg border border-[#d8dbe2] px-3 text-sm text-[#3e475a] outline-none"
              />
            </label>

            <label className="flex items-center gap-2 text-sm text-[#3e475a]">
              <input
                type="checkbox"
                checked={preferences.emailAlerts}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    emailAlerts: event.target.checked,
                  }))
                }
              />
              Email alerts for account events
            </label>

            <label className="flex items-center gap-2 text-sm text-[#3e475a]">
              <input
                type="checkbox"
                checked={preferences.weeklyDigest}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    weeklyDigest: event.target.checked,
                  }))
                }
              />
              Weekly usage digest
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={savePreferences}
                className="h-9 rounded-lg bg-[#6564ec] px-4 text-sm font-medium text-white"
              >
                Save Preferences
              </button>
              {saved ? <span className="text-sm text-[#2f8b57]">Saved</span> : null}
            </div>
          </div>
        </article>
      </section>
    </PermissionGate>
  );
}