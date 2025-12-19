import toast from "react-hot-toast";
import type { Task } from "@/types/task";

const HOURS_48 = 48 * 60 * 60 * 1000;

export const checkDueTasks = (
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) => {
  const now = new Date().getTime();

  setTasks(prevTasks =>
    prevTasks.map(task => {
      if (task.status === "done") return task;

      const dueTime = new Date(task.dueDate).getTime();
      const diff = dueTime - now;

      if (diff < 0 && !task.notified) {
        toast.error(`⚠️ Task "${task.title}" is overdue!`);
        return { ...task, notified: true };
      }

      if (diff > 0 && diff <= HOURS_48 && !task.notified) {
        toast(`⏰ "${task.title}" is due soon`);
        return { ...task, notified: true };
      }

      return task;
    })
  );
};
