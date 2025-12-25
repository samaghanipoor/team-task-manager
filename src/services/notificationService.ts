import toast from "react-hot-toast";
import type { Task } from "@/types/task";

const HOURS_48 = 48 * 60 * 60 * 1000; // 48 ساعت به میلی‌ثانیه

export const applyNotifications = (tasks: Task[]): Task[] => {
  const now = Date.now();

  return tasks.map(task => {
    if (task.status === "done" || task.notified) return task;

    const diff = new Date(task.dueDate).getTime() - now;

    if (diff < 0) {
      toast.error(`⚠️ Task "${task.title}" is overdue!`);
      return { ...task, notified: true };
    }

    if (diff <= HOURS_48) {
      toast(`⏰ "${task.title}" is due soon`);
      return { ...task, notified: true };
    }

    return task;
  });
};

