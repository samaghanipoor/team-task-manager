import React, { useState } from "react";
import type { Project, ProjectStatus } from "../../types/project";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Omit<Project, "id"> & { id?: number }) => void;
  projectToEdit?: Project;
}

interface FormState {
  title: string;
  description: string;
  status: ProjectStatus;
  dueDate: string;
}

const statusOptions: ProjectStatus[] = ["To Do", "In Progress", "Done"];

export default function ProjectModal({ isOpen, onClose, onSave, projectToEdit }: Props) {
  const initialForm: FormState = {
    title: projectToEdit?.title ?? "",
    description: projectToEdit?.description ?? "",
    status: projectToEdit?.status ?? "To Do",
    dueDate: projectToEdit?.dueDate ?? "",
  };

  const [form, setForm] = useState<FormState>(initialForm);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: projectToEdit?.id, ...form });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {projectToEdit ? "Edit Project" : "Add Project"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {projectToEdit ? "Save Changes" : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
