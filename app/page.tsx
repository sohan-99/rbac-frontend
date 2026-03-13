const challengeRows = [
  {
    before: "Role access is hard-coded in the codebase",
    after: "Any user can be granted access to any feature",
  },
  {
    before: "Adding a new permission requires a developer",
    after: "Admins and Managers configure permissions via UI",
  },
  {
    before: "Agents are permanently locked out of certain pages",
    after: "Agents see exactly what their manager allows",
  },
  {
    before: "No visibility into who did what and when",
    after: "Full audit trail of every admin action in the system",
  },
  {
    before: "Managers cannot customize their team’s capabilities",
    after: "No code changes needed to restructure access",
  },
];

const userRows = [
  {
    role: "Admin",
    type: "Business Owner / IT Admin",
    need:
      "Complete control. Manage all users, assign managers, configure the entire permission structure, and view a full overview of activity.",
  },
  {
    role: "Manager",
    type: "Team Lead / Department Head",
    need:
      "Create and manage the team (agents + customers). Control exactly which features each agent can use. Suspend or ban users with their scope.",
  },
  {
    role: "Agent",
    type: "Staff / Operator",
    need:
      "Work within modules their manager has unlocked. Could be managing leads, handling tasks, running reports, or whatever they’ve been given access to.",
  },
  {
    role: "Customer",
    type: "End Client / User",
    need:
      "Access their own self-service portal. View tickets, orders, or interactions. Cannot see internal operations unless explicitly granted.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f3f5f8] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-5xl rounded-md border border-[#b7c7db] bg-white p-5 shadow-[0_2px_14px_rgba(18,46,81,0.06)] md:p-7">
        <header className="border-b border-[#9fb3cf] pb-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a8eaa]">
            RBAC System - Full Stack Specification
          </p>
          <p className="mt-1 text-[11px] text-[#8ea2be]">
            Dynamic Permissions • v2.0
          </p>
        </header>

        <section className="mt-6">
          <h2 className="text-lg font-bold text-[#0f5ca7]">PROJECT OVERVIEW</h2>
          <p className="mt-3 text-[13px] leading-6 text-[#2e4055]">
            This system is a multi-role web platform where permissions drive
            everything - what a user sees, what pages they can open, and what
            actions they can take. No page is locked to a specific role. Access
            is granted atom by atom, from Admin down to Manager, Manager down to
            Agent, and optionally to Customers.
          </p>
        </section>

        <section className="mt-7">
          <h3 className="text-[21px] font-extrabold text-[#111827]">
            1. What Is This and Why Are We Building It?
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-[#2e4055]">
            Most systems hard-code role access. A manager sees the manager
            dashboard, an agent sees the agent dashboard, full stop. This
            project takes a different approach: access is fully dynamic.
          </p>
          <p className="mt-2 text-[13px] leading-6 text-[#2e4055]">
            The goal is a platform where an Admin or Manager can hand-pick
            exactly which features any user can access - regardless of their
            role label - and revoke that access at any time.
          </p>
        </section>

        <section className="mt-6">
          <h4 className="text-base font-bold text-[#0f5ca7]">
            1.1 The Problem We&apos;re Solving
          </h4>
          <div className="mt-3 overflow-x-auto rounded-sm border border-[#8fa8c5]">
            <table className="min-w-full border-collapse text-left text-[12px]">
              <thead>
                <tr>
                  <th className="w-1/2 border border-[#8fa8c5] bg-[#c63b3f] px-3 py-2 font-bold text-white">
                    Without This System
                  </th>
                  <th className="w-1/2 border border-[#8fa8c5] bg-[#0d8e66] px-3 py-2 font-bold text-white">
                    With This System
                  </th>
                </tr>
              </thead>
              <tbody>
                {challengeRows.map((row) => (
                  <tr key={row.before}>
                    <td className="border border-[#a7b8cc] bg-[#f6d9d9] px-3 py-2 text-[#2f3e52]">
                      • {row.before}
                    </td>
                    <td className="border border-[#a7b8cc] bg-[#d7f1e8] px-3 py-2 text-[#2f3e52]">
                      • {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-7">
          <h4 className="text-base font-bold text-[#0f5ca7]">1.2 Who Uses It</h4>
          <div className="mt-3 overflow-x-auto rounded-sm border border-[#8fa8c5]">
            <table className="min-w-full border-collapse text-left text-[12px]">
              <thead>
                <tr className="bg-[#0f2342] text-white">
                  <th className="border border-[#6b87a8] px-3 py-2 font-semibold">
                    Role
                  </th>
                  <th className="border border-[#6b87a8] px-3 py-2 font-semibold">
                    Type of User
                  </th>
                  <th className="border border-[#6b87a8] px-3 py-2 font-semibold">
                    What They Need From the System
                  </th>
                </tr>
              </thead>
              <tbody>
                {userRows.map((row) => (
                  <tr key={row.role}>
                    <td className="border border-[#a7b8cc] bg-[#efe7f7] px-3 py-2 font-semibold text-[#5f2f91]">
                      {row.role}
                    </td>
                    <td className="border border-[#a7b8cc] bg-[#f6f7fa] px-3 py-2 text-[#2f3e52]">
                      {row.type}
                    </td>
                    <td className="border border-[#a7b8cc] bg-[#f6f7fa] px-3 py-2 text-[#2f3e52]">
                      {row.need}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-8 border-t border-[#d0dae7] pt-3 text-[11px] text-[#9aa8ba]">
          Confidential - Digital Pylot
        </footer>
      </div>
    </main>
  );
}
