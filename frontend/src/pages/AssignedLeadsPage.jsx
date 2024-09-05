import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserLeads } from "../services/leadService";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const AssignedLeadsPage = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignedLeads();
  }, []);

  const fetchAssignedLeads = async () => {
    try {
      const assignedLeads = await getUserLeads();
      setLeads(assignedLeads);
    } catch (error) {
      console.error("Error fetching assigned leads:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-500";
      case "Contacted":
        return "bg-yellow-500";
      case "Qualified":
        return "bg-green-500";
      case "Lost":
        return "bg-red-500";
      case "Converted":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        My Assigned Leads
      </h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by company or contact name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <Link to={`/leads/lead-details/${lead._id}`} key={lead._id}>
            <Card
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate(`/leads/${lead._id}`)}
            >
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-blue-700">
                    {lead.company}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(
                      lead.status
                    )}`}
                  >
                    {lead.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{lead.name}</p>
                <p className="text-sm text-gray-500">
                  Created: {formatDate(lead.createdAt)}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No leads found.</p>
      )}
    </div>
  );
};

export default AssignedLeadsPage;
