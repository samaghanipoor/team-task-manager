import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProjectsList from "./pages/ProjectsList";
import ProjectTasks from "./pages/ProjectTasks";
import Users from "./pages/Users";
import AuthLogin from "./pages/AuthLogin";
import AuthRegister from "./pages/AuthRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard / Projects */}
        <Route
          path="/"
          element={
            <MainLayout>
              <ProjectsList />
            </MainLayout>
          }
        />

        {/* Tasks of a project */}
        <Route
          path="/projects/:id"
          element={
            <MainLayout>
              <ProjectTasks />
            </MainLayout>
          }
        />

        {/* Users management */}
        <Route
          path="/users"
          element={
            <MainLayout>
              <Users />
            </MainLayout>
          }
        />

        {/* Auth pages */}
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
