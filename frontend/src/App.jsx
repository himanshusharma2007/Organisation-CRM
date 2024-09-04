import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TodosPage from "./pages/TodosPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import DevsList from "./components/admin/DevsList";
import DevTodos from "./components/admin/DevTodos";
import LeadsPage from "./pages/LeadsPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <Layout>
                <Navigate to="/todo" replace />
              </Layout>
            }
          />
          <Route
            path="/todo"
            element={
              <Layout>
                <TodosPage />
              </Layout>
            }
          />
          <Route
            path="/projects"
            element={
              <Layout>
                <ProjectsPage />
              </Layout>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <Layout>
                <ProjectDetailsPage />
              </Layout>
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/users" />} />
          <Route
            path="/admin/users"
            element={
              <Layout>
                <AdminDashboard>
                  <DevsList />
                </AdminDashboard>
              </Layout>
            }
          />
          <Route
            path="/admin/user/:id"
            element={
              <Layout>
                <AdminDashboard>
                  <DevTodos />
                </AdminDashboard>
              </Layout>
            }
          />
          <Route
            path="/leads"
            element={
              <Layout>
                <LeadsPage />
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
