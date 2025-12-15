

import React from 'react';
import Button from '../ui/Button';

interface TaskItemProps {
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  onEdit: () => void;
  onDelete: () => void;
  onChangeStatus: () => void;
}

const statusColors = {
  todo: 'bg-gray-200 text-gray-800',
  doing: 'bg-yellow-200 text-yellow-800',
  done: 'bg-green-200 text-green-800',
};

const priorityColors = {
  low: 'text-green-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
};

export const TaskItem: React.FC<TaskItemProps> = ({
  title,
  description,
  status,
  priority,
  assignee,
  dueDate,
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  return (
    <div className="border p-4 rounded-xl shadow mb-4 bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
          <p className={`mt-1 text-sm font-medium ${priorityColors[priority]}`}>Priority: {priority}</p>
          <p className={`mt-1 text-sm font-medium ${statusColors[status]}`}>Status: {status}</p>
          <p className="mt-1 text-sm text-gray-700">Assignee: {assignee}</p>
          <p className="mt-1 text-sm text-gray-700">Due: {dueDate}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <Button onClick={onEdit} className="bg-blue-500 hover:bg-blue-600">Edit</Button>
          <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">Delete</Button>
          <Button onClick={onChangeStatus} className="bg-gray-500 hover:bg-gray-600">Change Status</Button>
        </div>
      </div>
    </div>
  );
};
