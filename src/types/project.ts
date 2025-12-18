export type ProjectStatus = "To Do" | "In Progress" | "Done";

export type Project = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: ProjectStatus;
};
