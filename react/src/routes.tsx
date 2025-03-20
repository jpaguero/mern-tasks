import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import TasksPage from "./pages/tasks/TasksPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ImageToText from "./pages/ia-models/ImageToText";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/image-to-text" element={<ImageToText />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
