import React, { useState, useEffect } from 'react';

interface TaskFiltersProps {
  assignees: string[];
  onFilterChange: (filters: {
    status?: 'todo' | 'doing' | 'done';
    priority?: 'low' | 'medium' | 'high';
    assignee?: string;
    dueDateFrom?: string;
    dueDateTo?: string;
  }) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({ assignees, onFilterChange }) => {
  const [status, setStatus] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [assignee, setAssignee] = useState<string>('');
  const [dueDateFrom, setDueDateFrom] = useState<string>('');
  const [dueDateTo, setDueDateTo] = useState<string>('');

  // بهینه: هر بار state تغییر کرد، فیلترها را ارسال می‌کنیم
  useEffect(() => {
    onFilterChange({
      status: status as 'todo' | 'doing' | 'done' | undefined,
      priority: priority as 'low' | 'medium' | 'high' | undefined,
      assignee: assignee || undefined,
      dueDateFrom: dueDateFrom || undefined,
      dueDateTo: dueDateTo || undefined,
    });
  }, [status, priority, assignee, dueDateFrom, dueDateTo, onFilterChange]);

  return (
    <div className="flex flex-wrap gap-2 mb-4 bg-white p-3 rounded-lg shadow-sm">
      {/* وضعیت */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
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
        onChange={(e) => setPriority(e.target.value)}
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
        onChange={(e) => setAssignee(e.target.value)}
        className="px-2 py-1 text-sm rounded border border-gray-300"
      >
        <option value="">All Assignees</option>
        {assignees.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

      {/* بازه تاریخ */}
      <input
        type="date"
        value={dueDateFrom}
        onChange={(e) => setDueDateFrom(e.target.value)}
        className="px-2 py-1 text-sm rounded border border-gray-300"
        placeholder="Due From"
      />
      <input
        type="date"
        value={dueDateTo}
        onChange={(e) => setDueDateTo(e.target.value)}
        className="px-2 py-1 text-sm rounded border border-gray-300"
        placeholder="Due To"
      />
    </div>
  );
};
