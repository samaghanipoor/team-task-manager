import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProjectsList from "./pages/ProjectsList";
import ProjectTasks from "./pages/ProjectTasks";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <ProjectsList />
            </MainLayout>
          }/>
          <Route path="/projects/:id" element={<ProjectTasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
