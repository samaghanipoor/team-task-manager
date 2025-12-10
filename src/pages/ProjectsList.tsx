// import React from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "To Do" | "In Progress" | "Done";
};

const projects: Project[] = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Redesign the company website with new branding",
    dueDate: "2025-12-20",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Mobile App Launch",
    description: "Launch the new iOS and Android mobile app",
    dueDate: "2025-12-25",
    status: "To Do",
  },
  {
    id: 3,
    title: "Marketing Campaign",
    description: "Plan and execute holiday marketing campaign",
    dueDate: "2025-12-15",
    status: "Done",
  },
];

export default function ProjectsList() {
  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Done":
        return "bg-[#10B981]"; // سبز
      case "In Progress":
        return "bg-[#F59E0B]"; // زرد
      case "To Do":
        return "bg-[#4F46E5]"; // بنفش
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="p-6 bg-[#F3F4F6] min-h-screen">
      <h2 className="text-2xl font-semibold text-[#111827] mb-6">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-[#111827]">
                {project.title}
              </h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-white px-3 py-1 rounded-full text-sm ${getStatusColor(
                  project.status
                )}`}
              >
                {project.status}
              </span>
              <span className="text-gray-500 text-sm">
                Due: {project.dueDate}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
