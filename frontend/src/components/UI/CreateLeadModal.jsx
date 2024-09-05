import React, { useState, useEffect } from "react";
import { createLead } from "../../services/leadService";
import { useAuth } from "../../context/AuthContext";
import { getSalesUsers } from "../../services/authService";

const CreateLeadModal = ({ isOpen, onClose, onLeadCreated }) => {
  const { user } = useAuth();
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    assignedTo: "",
    notes: "",
  });
  const [salesUsers, setSalesUsers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSalesUsers();
  }, []);

  const fetchSalesUsers = async () => {
    try {
      const users = await getSalesUsers();
      setSalesUsers(users.data);
    } catch (error) {
      console.error("Error fetching sales users:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error when user starts typing
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!leadData.name.trim()) newErrors.name = "Name is required";
    if (!leadData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(leadData.email))
      newErrors.email = "Email is invalid";
    if (!leadData.company.trim()) newErrors.company = "Company is required";
    if (!leadData.assignedTo)
      newErrors.assignedTo = "Please assign to a sales person";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createLead(leadData);
        onLeadCreated();
        onClose();
      } catch (error) {
        console.error("Error creating lead:", error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-[100vw] max-h-[100vh]   inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full md:h-[70vh] max-w-3xl overflow-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">
          Create New Lead
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={leadData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={leadData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={leadData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="company"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={leadData.company}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.company ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                required
              />
              {errors.company && (
                <p className="text-red-500 text-xs italic">{errors.company}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={leadData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Lost">Lost</option>
                <option value="Converted">Converted</option>
              </select>
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="assignedTo"
              >
                Assigned To
              </label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={leadData.assignedTo}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.assignedTo ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">Select a sales person</option>
                {salesUsers.map((salesUser) => (
                  <option key={salesUser._id} value={salesUser._id}>
                    {salesUser.firstName} {salesUser.lastName}
                  </option>
                ))}
              </select>
              {errors.assignedTo && (
                <p className="text-red-500 text-xs italic">
                  {errors.assignedTo}
                </p>
              )}
            </div>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="notes"
            >
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={leadData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLeadModal;
