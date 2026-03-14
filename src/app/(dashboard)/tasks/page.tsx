export default function TasksPage() {
  return (
    <section className="space-y-3.5">
      <div className="rounded-2xl border border-[#dfe2e7] bg-white p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search table"
              className="h-8 w-32.5 rounded-full border border-[#dfe2e7] bg-[#f9fafb] px-3 text-[12px] text-[#666f81] outline-none"
            />
            <button className="h-8 rounded-full bg-[#f1f2f5] px-4 text-[12px] font-semibold text-[#2f394b]">
              List
            </button>
            <button className="h-8 rounded-full px-3 text-[12px] text-[#778094]">Kanban</button>
            <button className="h-8 rounded-full px-3 text-[12px] text-[#778094]">Calendar</button>
          </div>
          <button className="h-8 rounded-lg bg-[#6564ec] px-4 text-[14px] font-medium text-white">+ Add</button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e1e4e9]">
          <div className="grid grid-cols-[2.3fr_1.5fr_1fr_1fr_1fr] border-b border-[#eceef2] bg-[#fcfcfd] px-3 py-2 text-[12px] font-medium text-[#8a92a5]">
            <span>Title</span>
            <span>Client name</span>
            <span>Priority</span>
            <span>Due date</span>
            <span>Status</span>
          </div>

          {[
            ["Call about proposal", "Bluestone", "Urgent", "20th Jun", "Ongoing"],
            ["Send onboarding docs", "Tech Ltd.", "High", "26th Jun", "On hold"],
            ["Follow up with Mira", "Omar Rahman", "Low", "5th Jul", "Done"],
            ["Prepare pitch deck", "Jabed Ali", "Medium", "8th Aug", "Not started"],
          ].map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-[2.3fr_1.5fr_1fr_1fr_1fr] items-center border-b border-[#f0f2f5] px-3 py-2.5 text-[14px] text-[#424b5e] last:border-b-0"
            >
              <span>{row[0]}</span>
              <span>{row[1]}</span>
              <span>
                <span className="rounded-full bg-[#fff2ec] px-2 py-0.5 text-[10px] font-medium text-[#fd6d3f]">{row[2]}</span>
              </span>
              <span>{row[3]}</span>
              <span>
                <span className="rounded-full bg-[#eef0f3] px-2 py-0.5 text-[10px] font-medium text-[#4b566a]">{row[4]}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[#dfe2e7] bg-white p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search board"
              className="h-8 w-32.5 rounded-full border border-[#dfe2e7] bg-[#f9fafb] px-3 text-[12px] text-[#666f81] outline-none"
            />
            <button className="h-8 rounded-full px-3 text-[12px] text-[#778094]">List</button>
            <button className="h-8 rounded-full bg-[#f1f2f5] px-4 text-[12px] font-semibold text-[#2f394b]">Kanban</button>
            <button className="h-8 rounded-full px-3 text-[12px] text-[#778094]">Calendar</button>
          </div>
          <button className="h-8 rounded-lg bg-[#6564ec] px-4 text-[14px] font-medium text-white">+ Add</button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            "Backlog",
            "In progress",
            "Review",
            "Completed",
            "Canceled",
          ].map((column) => (
            <div key={column} className="rounded-xl bg-[#f6f7f9] p-2">
              <p className="mb-2 px-1 text-[15px] font-medium text-[#3f485a]">{column}</p>
              <div className="rounded-lg border border-[#e6e8ed] bg-white p-2 shadow-[0_1px_0_rgba(18,24,40,0.02)]">
                <p className="text-[14px] font-medium text-[#3f485a]">Call about proposal</p>
                <p className="mt-1 text-[12px] text-[#9097a8]">Client name: Tech Ltd.</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-full bg-[#fff2ec] px-2 py-0.5 text-[11px] text-[#fd6d3f]">Urgent</span>
                  <span className="text-[12px] text-[#8c93a3]">Due: 5 Nov</span>
                </div>
                <p className="mt-2 text-[12px] text-[#80899b]">Project completion : 50%</p>
                <div className="mt-1 h-1.5 rounded-full bg-[#eceff4]">
                  <div className="h-1.5 w-1/2 rounded-full bg-[#ffb343]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}