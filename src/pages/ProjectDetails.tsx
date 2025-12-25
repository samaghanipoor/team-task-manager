import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "../components/ui/Button";
import { TaskList } from "../components/task/TaskList";
import { TaskForm } from "../components/task/TaskForm";
import { TaskFilters } from "../components/task/TaskFilters";

import type { Task } from "../types/task";
import toast from "react-hot-toast";

type TaskFiltersState = {
  status?: "todo" | "doing" | "done";
  priority?: "low" | "medium" | "high";
  assignee?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
};

export default function ProjectDetails() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState<Task[]>(() => {
    const now = Date.now();
    return [
      {
        id: "1",
        title: "Past Task",
        description: "Overdue task",
        status: "todo",
        priority: "high",
        assignee: "Ali",
        dueDate: new Date(now - 1 * 60 * 60 * 1000).toISOString(), // 1 ساعت گذشته
      },
      {
        id: "2",
        title: "Soon Task",
        description: "Due soon task",
        status: "todo",
        priority: "medium",
        assignee: "Sara",
        dueDate: new Date(now + 2 * 60 * 60 * 1000).toISOString(), // 2 ساعت بعد
      },
    ];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFiltersState>({});

  const assignees = Array.from(new Set(tasks.map(t => t.assignee)));

  // ------------------
  // CRUD Handlers
  // ------------------
  const handleAdd = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setShowForm(true);
    }
  };

  const handleDelete = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleChangeStatus = (taskId: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              status:
                t.status === "todo"
                  ? "doing"
                  : t.status === "doing"
                  ? "done"
                  : "todo",
            }
          : t
      )
    );
  };

  const handleSave = (taskData: Omit<Task, "id">) => {
    if (editingTask) {
      setTasks(prev =>
        prev.map(t => (t.id === editingTask.id ? { ...editingTask, ...taskData } : t))
      );
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
      };
      setTasks(prev => [...prev, newTask]);
    }
    setShowForm(false);
  };

  // ------------------
  // Filtering
  // ------------------
  const filteredTasks = tasks.filter(task => {
    let keep = true;
    if (filters.status) keep = keep && task.status === filters.status;
    if (filters.priority) keep = keep && task.priority === filters.priority;
    if (filters.assignee) keep = keep && task.assignee === filters.assignee;
    if (filters.dueDateFrom) keep = keep && task.dueDate >= filters.dueDateFrom;
    if (filters.dueDateTo) keep = keep && task.dueDate <= filters.dueDateTo;
    return keep;
  });

  // ------------------
  // Notifications (toast)
  // ------------------
  useEffect(() => {
    const now = Date.now();
    tasks.forEach(task => {
      if (task.status === "done") return;

      const dueTime = new Date(task.dueDate).getTime();
      const diff = dueTime - now;

      if (diff < 0) {
        toast.error(`⚠️ Task "${task.title}" is overdue!`);
      } else if (diff <= 48 * 60 * 60 * 1000) {
        toast(`⏰ "${task.title}" is due soon`);
      }
    });
  }, [tasks]);

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project #{projectId}</h1>
        <Button onClick={handleAdd}>+ Add Task</Button>
      </header>

      <TaskFilters assignees={assignees} onFilterChange={setFilters} />

      {showForm && (
        <TaskForm
          assignees={assignees}
          initialData={editingTask || undefined}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeStatus={handleChangeStatus}
      />
    </div>
  );
}

