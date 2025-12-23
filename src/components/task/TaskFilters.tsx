import React, { useState } from "react";

interface TaskFiltersProps {
  assignees: string[];
  onFilterChange: (filters: {
    status?: "todo" | "doing" | "done";
    priority?: "low" | "medium" | "high";
    assignee?: string;
    dueDateFrom?: string;
    dueDateTo?: string;
  }) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ assignees, onFilterChange }) => {
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");
  const [dueDateFrom, setDueDateFrom] = useState<string>("");
  const [dueDateTo, setDueDateTo] = useState<string>("");

  // helper function to create filters object
  const createFilters = () => ({
    status: status as "todo" | "doing" | "done" | undefined,
    priority: priority as "low" | "medium" | "high" | undefined,
    assignee: assignee || undefined,
    dueDateFrom: dueDateFrom || undefined,
    dueDateTo: dueDateTo || undefined,
  });

  // call onFilterChange فقط در event handlerها، بدون useEffect → جلوگیری از حلقه بی‌نهایت
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    onFilterChange(createFilters());
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(e.target.value);
    onFilterChange(createFilters());
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAssignee(e.target.value);
    onFilterChange(createFilters());
  };

  const handleDueDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDateFrom(e.target.value);
    onFilterChange(createFilters());
  };

  const handleDueDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDateTo(e.target.value);
    onFilterChange(createFilters());
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 bg-white p-3 rounded-lg shadow-sm">
      {/* وضعیت */}
      <select
        value={status}
        onChange={handleStatusChange}
        className="px-2 py-1 text-sm rounded border border-gray-300"
      >
        <option value="">All Status</option>
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>

      {/* اولویت */}
      <select
        value={priority}
        onChange={handlePriorityChange}
        className="px-2 py-1 text-sm rounded border border-gray-300"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* مسئول */}
      <select
        value={assignee}
        onChange={handleAssigneeChange}
        className="px-2 py-1 text-sm rounded border border-gray-300"
      >
        <option value="">All Assignees</option>
        {assignees.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      {/* بازه تاریخ */}
      <input
        type="date"
        value={dueDateFrom}
        onChange={handleDueDateFromChange}
        className="px-2 py-1 text-sm rounded border border-gray-300"
        placeholder="Due From"
      />
      <input
        type="date"
        value={dueDateTo}
        onChange={handleDueDateToChange}
        className="px-2 py-1 text-sm rounded border border-gray-300"
        placeholder="Due To"
      />
    </div>
  );
};
