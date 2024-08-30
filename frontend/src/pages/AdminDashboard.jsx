import React, { useEffect, useState } from "react";
import { getAdmin } from "../services/adminService";

const AdminDashboard = ({ children }) => {
   useEffect(() => {
     const loadAdmin = async () => {
       try {
         const AdminData = await getAdmin();
         console.log("AdminData :>> ", AdminData);
       } catch (error) {
         console.error("Failed to load Admin:", error);
       } finally {
       }
     };

     loadAdmin();
   }, []);
  return (
    <div className="flex justify-start  p-4 min-w-full min-h-screen">
      <aside className="w-[30%]">
        <ul>
          <li className="text-xl px-4 py-2 bg-zinc-800 text-white">
            Developers Todos
          </li>
        </ul>
      </aside>
      <div className="wraper flex-grow bg-white text-black">
        <h1>Admin Dashboard</h1>
        {children}
      </div>
    </div>
  );
};

export default AdminDashboard;
