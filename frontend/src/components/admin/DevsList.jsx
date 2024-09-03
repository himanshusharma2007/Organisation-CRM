import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getAllUsers,
  deleteDeveloper,
  editDeveloperName,
} from "../../services/adminService";
import Modal from "../UI/Modal";

const DevsList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedName, setEditedName] = useState({ firstName: "", lastName: "" });

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

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditedName({ firstName: user.firstName, lastName: user.lastName });
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDeveloper(selectedUser._id);
      setUsers(users.filter((user) => user._id !== selectedUser._id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting developer:", error);
      setError("Failed to delete developer. Please try again.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await editDeveloperName(selectedUser._id, editedName);
      setUsers(
        users.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedUser } : user
        )
      );
      fetchUsers();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error editing developer name:", error);
      setError("Failed to edit developer name. Please try again.");
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
    <div className=" mx-auto  w-full ">
      <h2 className="text-2xl font-bold mb-6 text-black">Developers List</h2>
      {users.length === 0 ? (
        <div className="text-gray-400">No users found.</div>
      ) : (
        <div className="flex gap-4 flex-col flex-grow   min-w-64">
          {users.map((user, index) => (
            <div
              key={user._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center w-full bg-blue-500 rounded-lg p-4"
            >
              <div className="flex  items-center space-x-3">
                <div className="text-yellow-500 text-2xl">{index + 1}</div>
                <h3 className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Link
                  to={`/admin/user/${user._id}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded transition duration-200"
                >
                  <button onClick={() => saveDev(user)}>View Todos</button>
                </Link>
                <button
                  onClick={() => handleEditClick(user)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <p>
          Are you sure you want to delete this developer and all associated
          todos?
        </p>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Developer Name"
      >
        <form onSubmit={handleEdit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={editedName.firstName}
              onChange={(e) =>
                setEditedName({ ...editedName, firstName: e.target.value })
              }
              className="w-full  text-gray-700 px-3 py-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={editedName.lastName}
              onChange={(e) =>
                setEditedName({ ...editedName, lastName: e.target.value })
              }
              className="w-full text-gray-700  px-3 py-2 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DevsList;
