import React, { useEffect } from "react";
import { getAdmin } from "../services/adminService";

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
    <div className="flex min-h-screen  text-white w-screen">
  
      <div className="w-full p-10">{children}</div>
    </div>
  );
};

export default AdminDashboard;
