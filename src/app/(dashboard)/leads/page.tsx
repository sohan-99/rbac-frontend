"use client";

import { useMemo } from "react";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";

export default function LeadsPage() {
  const leads = [
    { id: "L-1001", company: "Blue Orbit", owner: "Rafid", stage: "Qualified", value: 15000 },
    { id: "L-1002", company: "Northpeak Labs", owner: "Nabila", stage: "Proposal", value: 28000 },
    { id: "L-1003", company: "Crescent Retail", owner: "Samir", stage: "Discovery", value: 9000 },
    { id: "L-1004", company: "Acme Logistics", owner: "Lamia", stage: "Negotiation", value: 41000 },
    { id: "L-1005", company: "Riverline", owner: "Raihan", stage: "Qualified", value: 22000 },
  ];

  const stageSummary = useMemo(() => {
    return leads.reduce<Record<string, number>>((summary, lead) => {
      summary[lead.stage] = (summary[lead.stage] ?? 0) + 1;
      return summary;
    }, {});
  }, [leads]);

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);

  return (
    <PermissionGate
      permission={PERMISSIONS.LEADS_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Leads.</p>}
    >
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2f394b]">Leads</h1>
          <p className="text-sm text-[#6d7588]">
            Pipeline tracking for sales-qualified and active opportunities.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-[#e1e4ea] bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-[#8b93a5]">Total leads</p>
            <p className="mt-1 text-2xl font-semibold text-[#2f394b]">{leads.length}</p>
          </article>
          <article className="rounded-xl border border-[#e1e4ea] bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-[#8b93a5]">Pipeline value</p>
            <p className="mt-1 text-2xl font-semibold text-[#5862db]">${totalValue.toLocaleString()}</p>
          </article>
          {Object.entries(stageSummary)
            .slice(0, 2)
            .map(([stage, count]) => (
              <article key={stage} className="rounded-xl border border-[#e1e4ea] bg-white px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-[#8b93a5]">{stage}</p>
                <p className="mt-1 text-2xl font-semibold text-[#2f394b]">{count}</p>
              </article>
            ))}
        </div>

        <article className="overflow-hidden rounded-xl border border-[#e1e4ea] bg-white">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_0.8fr] border-b border-[#eceef2] bg-[#f8f9fb] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#7f8798]">
            <span>Lead ID</span>
            <span>Company</span>
            <span>Owner</span>
            <span>Stage</span>
            <span>Value</span>
          </div>

          {leads.map((lead) => (
            <div
              key={lead.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_0.8fr] border-b border-[#f1f2f5] px-4 py-3 text-sm text-[#445066] last:border-b-0"
            >
              <span className="font-medium text-[#2f394b]">{lead.id}</span>
              <span>{lead.company}</span>
              <span>{lead.owner}</span>
              <span>
                <span className="rounded-full bg-[#edf0f5] px-2 py-0.5 text-xs text-[#616c82]">
                  {lead.stage}
                </span>
              </span>
              <span>${lead.value.toLocaleString()}</span>
            </div>
          ))}
        </article>
      </section>
    </PermissionGate>
  );
}