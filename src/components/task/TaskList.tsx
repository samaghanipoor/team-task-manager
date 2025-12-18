import React from 'react';
import { TaskItem } from './TaskItem';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onChangeStatus: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onChangeStatus,
}) => {
  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks available.</p>;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          priority={task.priority}
          assignee={task.assignee}
          dueDate={task.dueDate}
          onEdit={() => onEdit(task.id)}
          onDelete={() => onDelete(task.id)}
          onChangeStatus={() => onChangeStatus(task.id)}
        />
      ))}
    </div>
  );
};
