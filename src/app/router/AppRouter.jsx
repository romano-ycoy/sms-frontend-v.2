import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/widgets/layout";
import { DashboardPage } from "@/pages/dashboard";
import { StudentsPage } from "@/pages/students";
import { LoginPage } from "@/pages/login";

export function AppRouter() {
  return (
    <Routes>
      {/* Default route redirects to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route path="/app" element={<Layout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="students" element={<StudentsPage />} />
      </Route>
    </Routes>
  );
}
