import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TodosPage from "./pages/TodosPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import { AuthProvider } from "./context/AuthContext";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
          <main className="flex w-full rounded-md mx-auto ">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/todo" element={<TodosPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/" element={<Navigate to="/todo" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
