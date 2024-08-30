import React, { useEffect } from "react";
import { getAdmin } from "../services/adminService";
import { Link } from "react-router-dom";

const AdminDashboard = ({ children }) => {
  useEffect(() => {
    const loadAdmin = async () => {
      try {
        const AdminData = await getAdmin();
        console.log("AdminData :>> ", AdminData);
      } catch (error) {
        console.error("Failed to load Admin:", error);
      }
    };

    loadAdmin();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link to="/admin/users">
              <div className="text-gray-300 hover:text-white transition duration-200">
                Developers Todos
              </div>
            </Link>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </aside>
      <div className="flex-1 p-10">{children}</div>
    </div>
  );
};

export default AdminDashboard;
