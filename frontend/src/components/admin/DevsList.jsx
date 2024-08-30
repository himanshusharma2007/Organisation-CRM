import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getAllUsers } from "../../services/adminService";

const DevsList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { saveDev } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Developers List</h2>
      {users.length === 0 ? (
        <div className="text-gray-400">No users found.</div>
      ) : (
        <div className="flex flex-col w-full gap-4">
          {users.map((user, index) => (
            <Link
              to={`/admin/user/${user._id}`}
              key={user._id}
              className="block"
            >
              <button
                onClick={() => saveDev(user)}
                className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200"
              >
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-4 text-blue-500">
                    {index + 1}
                  </span>
                  <span className="text-lg">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevsList;
