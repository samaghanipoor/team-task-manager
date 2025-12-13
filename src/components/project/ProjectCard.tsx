import type { Project } from "../../types/project";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Project;
  onOpen?: (id: number) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (id: number) => void; 
}

export default function ProjectCard({ project, onOpen, onEdit, onDelete }: Props) {
  const navigate = useNavigate();

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Done":
        return "bg-[#10B981]";
      case "In Progress":
        return "bg-[#F59E0B]";
      case "To Do":
        return "bg-[#4F46E5]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-[#111827]">{project.title}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">{project.description}</p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span
          className={`text-white px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
        <span className="text-gray-400 text-xs">Due: {project.dueDate}</span>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => {
            onOpen?.(project.id);       // اگر همچنان میخوای callback داشته باشی
            navigate(`/projects/${project.id}`); // ← اینجا ناوبری انجام میشه
          }}
          className="flex-1 text-sm border rounded-lg py-2 hover:bg-gray-50"
        >
          Open
        </button>

        <button
          onClick={() => onEdit?.(project)}
          className="flex-1 text-sm border rounded-lg py-2 hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete?.(project.id)}
          className="flex-1 text-sm border rounded-lg py-2 hover:bg-red-100 text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
