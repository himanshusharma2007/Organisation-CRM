import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeadById, updateLead, deleteLead } from "../services/leadService";
import { useAuth } from "../context/AuthContext";
const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [lead, setLead] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchLeadDetails();
  }, [id]);

  const fetchLeadDetails = async () => {
    try {
      const leadData = await getLeadById(id);
      setLead(leadData);
    } catch (error) {
      console.error("Error fetching lead details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;    
    setLead((prevLead) => ({
      ...prevLead,                                  
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLead(id, lead);
      setIsEditing(false);
      fetchLeadDetails();
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };
const handleDelete = async () => {
  if (window.confirm("Are you sure you want to delete this lead?")) {
    try {
      await deleteLead(id);
      navigate("/leads");
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  }
}; 
  if (!lead) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Lead Details</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                value={lead.name}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!isEditing}
                required
              />
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
                value={lead.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!isEditing}
                required
              />
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
                value={lead.phone}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!isEditing}
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
                value={lead.company}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <input
                type="text"
                id="status"
                name="status"
                value={lead.status}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="assignedTo"
              >
                Assigned To
              </label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={`${lead.assignedTo?.firstName} ${lead.assignedTo?.lastName}`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled
              />
            </div>
            <div className="col-span-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="notes"
              >
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={lead.notes}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={!isEditing}
                rows="4"
              ></textarea>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              >
                Edit
              </button>
            )}
            {user.role === "admin" && !isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete Lead
              </button>
            )}
            {isEditing && (
              <>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    fetchLeadDetails();
                  }}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadDetailsPage;
