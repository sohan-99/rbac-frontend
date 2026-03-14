"use client";

import { useMemo, useState } from "react";
import { PermissionGate } from "@/components/permission/PermissionGate";
import { PERMISSIONS } from "@/constants/permissions";
import { useAuth } from "@/hooks/useAuth";

type TaskStatus = "Backlog" | "In Progress" | "Review" | "Completed" | "Canceled";

type TaskPriority = "Low" | "Medium" | "High" | "Urgent";

type TaskItem = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  owner: string;
};

export default function TasksPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<TaskPriority>("Medium");
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: "TSK-1001",
      title: "Follow up with onboarding client",
      status: "In Progress",
      priority: "High",
      dueDate: "2026-03-20",
      owner: user?.name ?? "Unassigned",
    },
    {
      id: "TSK-1002",
      title: "Prepare weekly performance report",
      status: "Review",
      priority: "Medium",
      dueDate: "2026-03-18",
      owner: user?.name ?? "Unassigned",
    },
    {
      id: "TSK-1003",
      title: "Close overdue customer request",
      status: "Backlog",
      priority: "Urgent",
      dueDate: "2026-03-16",
      owner: user?.name ?? "Unassigned",
    },
  ]);

  const filteredTasks = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return tasks;
    }

    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(normalized) ||
        task.id.toLowerCase().includes(normalized) ||
        task.status.toLowerCase().includes(normalized)
      );
    });
  }, [tasks, query]);

  const grouped = useMemo(() => {
    const initial: Record<TaskStatus, TaskItem[]> = {
      Backlog: [],
      "In Progress": [],
      Review: [],
      Completed: [],
      Canceled: [],
    };

    for (const task of filteredTasks) {
      initial[task.status].push(task);
    }

    return initial;
  }, [filteredTasks]);

  function addTask() {
    const title = newTitle.trim();
    if (!title) {
      return;
    }

    const task: TaskItem = {
      id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      status: "Backlog",
      priority: newPriority,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
      owner: user?.name ?? "Unassigned",
    };

    setTasks((current) => [task, ...current]);
    setNewTitle("");
    setNewPriority("Medium");
  }

  function moveTask(taskId: string, status: TaskStatus) {
    setTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  }

  return (
    <PermissionGate
      permission={PERMISSIONS.TASKS_VIEW}
      fallback={<p className="text-sm text-[#8a6272]">You do not have access to Tasks.</p>}
    >
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#2f394b]">Tasks</h1>
          <p className="text-sm text-[#70788b]">
            Plan, prioritize, and track execution progress with permission-safe access.
          </p>
        </div>

        <div className="rounded-xl border border-[#e1e4ea] bg-white p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <input
              type="text"
              value={newTitle}
              onChange={(event) => setNewTitle(event.target.value)}
              placeholder="Add a new task"
              className="h-10 rounded-lg border border-[#d8dbe2] px-3 text-sm text-[#3e475a] outline-none"
            />
            <select
              value={newPriority}
              onChange={(event) => setNewPriority(event.target.value as TaskPriority)}
              className="h-10 rounded-lg border border-[#d8dbe2] bg-white px-3 text-sm text-[#3e475a] outline-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
            <button
              type="button"
              onClick={addTask}
              className="h-10 rounded-lg bg-[#6564ec] px-4 text-sm font-medium text-white"
            >
              Add Task
            </button>
          </div>

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, id, or status"
            className="mt-3 h-10 w-full rounded-lg border border-[#d8dbe2] px-3 text-sm text-[#3e475a] outline-none"
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {(Object.keys(grouped) as TaskStatus[]).map((status) => (
            <article key={status} className="rounded-xl border border-[#e1e4ea] bg-white p-3">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#2f394b]">{status}</h2>
                <span className="rounded-full bg-[#eef1f6] px-2 py-0.5 text-xs text-[#5f6980]">
                  {grouped[status].length}
                </span>
              </div>

              <div className="space-y-2">
                {grouped[status].length === 0 ? (
                  <p className="rounded-lg border border-dashed border-[#dfe3ea] p-2 text-xs text-[#8a91a1]">
                    No tasks
                  </p>
                ) : (
                  grouped[status].map((task) => (
                    <div key={task.id} className="rounded-lg border border-[#e8ebf1] p-2 text-sm">
                      <p className="font-medium text-[#2f394b]">{task.title}</p>
                      <p className="mt-1 text-xs text-[#7e8798]">{task.id} · Due {task.dueDate}</p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <span className="rounded-full bg-[#fff2ec] px-2 py-0.5 text-[10px] font-semibold text-[#d66537]">
                          {task.priority}
                        </span>
                        <select
                          value={task.status}
                          onChange={(event) => moveTask(task.id, event.target.value as TaskStatus)}
                          className="h-7 rounded-md border border-[#d8dbe2] bg-white px-2 text-[11px] text-[#4b5569] outline-none"
                        >
                          <option value="Backlog">Backlog</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Review">Review</option>
                          <option value="Completed">Completed</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PermissionGate>
  );
}