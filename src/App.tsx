import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProjectsList from "./pages/ProjectsList";
import Users from "./pages/Users";
import AuthLogin from "./pages/AuthLogin";
import AuthRegister from "./pages/AuthRegister";

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
          }
        />

      
        <Route
          path="/users"
          element={
            <MainLayout>
              <Users />
            </MainLayout>
          }
        />

        
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/register" element={<AuthRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
