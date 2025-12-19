import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "../components/ui/Button";
import { TaskList } from "../components/task/TaskList";
import { TaskForm } from "../components/task/TaskForm";
import { TaskFilters } from "../components/task/TaskFilters";

import type { Task } from "../types/task";
import { checkDueTasks } from "../services/notificationService";

type TaskFiltersState = {
  status?: "todo" | "doing" | "done";
  priority?: "low" | "medium" | "high";
  assignee?: string;
  dueDateFrom?: string;
  dueDateTo?: string;
};

export default function ProjectDetails() {
  const { projectId } = useParams();

  // ✅ Function initializer برای مقدار اولیه tasks
  const [tasks, setTasks] = useState<Task[]>(() => [
    {
      id: "1",
      title: "Design UI",
      description: "Create mockups for dashboard",
      status: "todo",
      priority: "high",
      assignee: "Ali",
      dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 ساعت بعد
    },
    {
      id: "2",
      title: "Set up Redux",
      description: "Configure store and slices",
      status: "doing",
      priority: "medium",
      assignee: "Sara",
      dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 ساعت گذشته
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFiltersState>({});

  // 🔔 Trigger notifications when tasks change
  useEffect(() => {
    const hasUnnotified = tasks.some(task => !task.notified);
    if (hasUnnotified) {
      checkDueTasks(setTasks);
    }
  }, [tasks]);
  
  

  const assignees = Array.from(new Set(tasks.map((t) => t.assignee)));

  // ------------------
  // CRUD Handlers
  // ------------------
  const handleAdd = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEdit = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setShowForm(true);
    }
  };

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleChangeStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
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
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...editingTask, ...taskData } : t))
      );
    } else {
      const newTask: Task = {
        ...taskData,
        id: (tasks.length + 1).toString(),
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setShowForm(false);
  };

  // ------------------
  // Filtering
  // ------------------
  const filteredTasks = tasks.filter((task) => {
    let keep = true;
    if (filters.status) keep = keep && task.status === filters.status;
    if (filters.priority) keep = keep && task.priority === filters.priority;
    if (filters.assignee) keep = keep && task.assignee === filters.assignee;
    if (filters.dueDateFrom) keep = keep && task.dueDate >= filters.dueDateFrom;
    if (filters.dueDateTo) keep = keep && task.dueDate <= filters.dueDateTo;
    return keep;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Project Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Project #{projectId}</h1>
          <p className="text-sm text-muted-foreground">Project description goes here</p>
        </div>
        <Button onClick={handleAdd}>+ Add Task</Button>
      </header>

      {/* Task Filters */}
      <TaskFilters assignees={assignees} onFilterChange={setFilters} />

      {/* Task Form */}
      {showForm && (
        <TaskForm
          assignees={assignees}
          initialData={editingTask || undefined}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeStatus={handleChangeStatus}
      />
    </div>
  );
}
