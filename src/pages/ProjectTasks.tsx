import { useParams } from "react-router-dom";

export default function ProjectTasks() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Project ID: {id}</h2>
      <p>صفحه جزئیات پروژه و لیست تسک‌ها اینجا قرار می‌گیرد.</p>
    </div>
  );
}
