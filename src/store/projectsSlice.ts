import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export type ProjectStatus = "To Do" | "In Progress" | "Done";

export interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: ProjectStatus;
}

interface ProjectsState {
  projects: Project[];
}


const initialState: ProjectsState = {
  projects: [
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
  ],
};


const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },

    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projects.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },

    deleteProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter(
        (p) => p.id !== action.payload
      );
    },
  },
});


export const { addProject, updateProject, deleteProject } =
  projectsSlice.actions;

export default projectsSlice.reducer;
