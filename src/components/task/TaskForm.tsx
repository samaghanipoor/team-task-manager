import React, { useState } from 'react';
import Button from '../ui/Button';

interface TaskFormProps {
  assignees: string[];
  initialData?: {
    title: string;
    description: string;
    status: 'todo' | 'doing' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    dueDate: string;
  };
  onSave: (data: {
    title: string;
    description: string;
    status: 'todo' | 'doing' | 'done';
    priority: 'low' | 'medium' | 'high';
    assignee: string;
    dueDate: string;
  }) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ assignees, initialData, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [status, setStatus] = useState<'todo' | 'doing' | 'done'>(initialData?.status || 'todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialData?.priority || 'medium');
  const [assignee, setAssignee] = useState(initialData?.assignee || '');
  const [dueDate, setDueDate] = useState(initialData?.dueDate || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, description, status, priority, assignee, dueDate });
  };

  return (
    <form className="p-4 bg-white rounded-2xl shadow space-y-3" onSubmit={handleSubmit}>
      <input
  type="text"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full text-sm px-2 py-1 rounded border border-gray-300"
   placeholder="Task title"
/>

<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full text-sm px-2 py-1 rounded border border-gray-300"
  placeholder="Task description"
  rows={3}
/>

      <div className="flex space-x-2">
        <select
          value={status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setStatus(e.target.value as 'todo' | 'doing' | 'done')
          }
          className="border p-2 rounded"
        >
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>

        <select
          value={priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setPriority(e.target.value as 'low' | 'medium' | 'high')
          }
          className="border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={assignee}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAssignee(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Assignee</option>
          {assignees.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex space-x-2">
        <Button type="submit">Save</Button>
        <Button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-600">Cancel</Button>
      </div>
    </form>
  );
};
