import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllLeads } from "../services/leadService";
import CreateLeadModal from "../components/UI/CreateLeadModal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useAuth } from "../context/AuthContext";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-4 py-3 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const fetchedLeads = await getAllLeads();
      setLeads(fetchedLeads);
      calculateAnalytics(fetchedLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };
  const handleLeadCreated = () => {
    fetchLeads(); // Refetch leads after a new one is created
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const calculateAnalytics = (fetchedLeads) => {
    const totalLeads = fetchedLeads.length;
    const convertedLeads = fetchedLeads.filter(
      (lead) => lead.status === "Converted"
    ).length;
    const lostLeads = fetchedLeads.filter(
      (lead) => lead.status === "Lost"
    ).length;
    const uniqueCompanies = new Set(fetchedLeads.map((lead) => lead.company))
      .size;

    setAnalytics({ totalLeads, convertedLeads, lostLeads, uniqueCompanies });
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

  return (
    <div className="container mx-auto p-4">
      <div className="wraper flex w-full justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Lead Management
        </h1>
        {(user?.role === "admin" || user?.department === "sales") && (
          <button
            onClick={openModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xl rounded focus:outline-none focus:shadow-outline"
          >
            Create Lead
          </button>
        )}
      </div>
      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="font-semibold text-lg">Total Leads</CardHeader>
          <CardContent className="text-3xl font-bold text-blue-600">
            {analytics.totalLeads}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-semibold text-lg">
            Converted Leads
          </CardHeader>
          <CardContent className="text-3xl font-bold text-green-600">
            {analytics.convertedLeads}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-semibold text-lg">Lost Leads</CardHeader>
          <CardContent className="text-3xl font-bold text-red-600">
            {analytics.lostLeads}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-semibold text-lg">
            Unique Companies
          </CardHeader>
          <CardContent className="text-3xl font-bold text-purple-600">
            {analytics.uniqueCompanies}
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mb-8">
        <CardHeader className="font-semibold text-lg">
          Lead Status Distribution
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                {
                  status: "New",
                  count: leads.filter((lead) => lead.status === "New").length,
                },
                {
                  status: "Contacted",
                  count: leads.filter((lead) => lead.status === "Contacted")
                    .length,
                },
                {
                  status: "Qualified",
                  count: leads.filter((lead) => lead.status === "Qualified")
                    .length,
                },
                { status: "Lost", count: analytics.lostLeads },
                { status: "Converted", count: analytics.convertedLeads },
              ]}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#3B82F6"
                barSize={window.innerWidth < 768 ? 50 : 30} // Responsive bar size
              >
                {/* Assign colors to bars based on the status */}
                <Cell fill="#3B82F6" key="New" />
                <Cell fill="#F59E0B" key="Contacted" />
                <Cell fill="#10B981" key="Qualified" />
                <Cell fill="#EF4444" key="Lost" />
                <Cell fill="#8B5CF6" key="Converted" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lead Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <Link to={`/leads/lead-details/${lead._id}`} key={lead._id}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
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
                <p className="text-sm text-gray-500">
                  Assigned to: {lead.assignedTo?.userName || "Unassigned"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {/* Create Lead Modal */}
        {isModalOpen && (
          <CreateLeadModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onLeadCreated={handleLeadCreated}
          />
        )}
      </div>
    </div>
  );
};

export default LeadsPage;
