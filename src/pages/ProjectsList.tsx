import { useState } from "react";
import ProjectCard from "../components/project/ProjectCard";
import ProjectModal from "../components/project/ProjectModal";
import type { Project } from "../types/project";

const initialProjects: Project[] = [
  { id: 1, title: "Website Redesign", description: "Redesign the company website", dueDate: "2025-12-20", status: "In Progress" },
  { id: 2, title: "Mobile App Launch", description: "Launch iOS & Android app", dueDate: "2025-12-25", status: "To Do" },
  { id: 3, title: "Marketing Campaign", description: "Holiday marketing campaign", dueDate: "2025-12-15", status: "Done" },
];

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(undefined);

  const handleOpenProject = (id: number) => {
    console.log("Open project with id:", id);
  };

  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };
  const handleDeleteProject = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;
  
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };
  
  const handleSaveProject = (newProject: Omit<Project, "id"> & { id?: number }) => {
    if (newProject.id) {
      setProjects((prev) =>
        prev.map((p) => (p.id === newProject.id ? { ...p, ...newProject } as Project : p))
      );
    } else {
      const nextId = projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
      setProjects([...projects, { ...newProject, id: nextId } as Project]);
    }
  };

  return (
    <div className="p-6 bg-[#F3F4F6] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#111827]">Projects</h2>
        <button
          onClick={() => {
            setProjectToEdit(undefined);
            setIsModalOpen(true);
          }}
          className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg"
        >
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={handleOpenProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject} 
          />
        ))}
      </div>

      <ProjectModal
        key={projectToEdit?.id ?? "new"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />
    </div>
  );
}
