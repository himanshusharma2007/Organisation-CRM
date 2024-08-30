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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {users.length === 0 ? (
        <div>No users found.</div>
      ) : (
        users.map((user, index) => (
          <Link to={`/admin/user/${user._id}`} key={user._id}>
            <button
              onClick={() => saveDev(user)}
              className="flex justify-start w-full px-2 py-2 bg-gray-100 hover:bg-gray-200 mb-2 rounded"
            >
              <span className="w-[20%]">{index + 1}</span>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </button>
          </Link>
        ))
      )}
    </div>
  );
};

export default DevsList;
