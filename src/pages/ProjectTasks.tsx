import { useState } from "react";
import { useParams } from "react-router-dom";
import { TaskList } from "../components/task/TaskList";
import { TaskForm } from "../components/task/TaskForm";
import { TaskFilters } from "../components/task/TaskFilters";
import type { Task } from "../types/task";
import Button from "../components/ui/Button";

export default function ProjectTasks() {
  const { id } = useParams();
  const projectId = Number(id);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design UI",
      description: "Create dashboard mockups",
      status: "todo",
      priority: "high",
      assignee: "Ali",
      dueDate: "2025-12-20",
    },
    {
      id: "2",
      title: "Setup Redux",
      description: "Configure store and slices",
      status: "doing",
      priority: "medium",
      assignee: "Sara",
      dueDate: "2025-12-18",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState({
    status: "" as "" | "todo" | "doing" | "done",
    priority: "" as "" | "low" | "medium" | "high",
    assignee: "",
    dueDateFrom: "",
    dueDateTo: "",
  });

  const assignees = Array.from(new Set(tasks.map((t) => t.assignee)));

  // --- Handlers ---
  const handleAddTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      setShowForm(true);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
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

  const handleSaveTask = (taskData: Omit<Task, "id">) => {
    if (editingTask) {
      // Edit
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id ? { ...t, ...taskData } : t
        )
      );
    } else {
      // Add
      const newTask: Task = {
        id: (tasks.length + 1).toString(),
        ...taskData,
      };
      setTasks((prev) => [...prev, newTask]);
    }
    setShowForm(false);
  };

  // --- Filtering ---
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
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project #{projectId} Tasks</h1>
        <Button onClick={handleAddTask}>+ Add Task</Button>
      </header>

      {/* Filters */}
      <TaskFilters
  assignees={assignees}
  onFilterChange={(newFilters) =>
    setFilters({
      status: newFilters.status ?? "",
      priority: newFilters.priority ?? "",
      assignee: newFilters.assignee ?? "",
      dueDateFrom: newFilters.dueDateFrom ?? "",
      dueDateTo: newFilters.dueDateTo ?? "",
    })
  }
/>



      {/* Task Form */}
      {showForm && (
        <TaskForm
          assignees={assignees}
          initialData={editingTask || undefined}
          onSave={handleSaveTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onChangeStatus={handleChangeStatus}
      />
    </div>
  );
}
