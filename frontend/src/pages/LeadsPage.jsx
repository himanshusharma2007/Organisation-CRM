import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllLeads } from "../services/leadService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
  const [analytics, setAnalytics] = useState({
    totalLeads: 0,
    convertedLeads: 0,
    lostLeads: 0,
    uniqueCompanies: 0,
  });
  const navigate = useNavigate();

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
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Lead Management</h1>

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
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Lead Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <Card
            key={lead._id}
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
              <p className="text-sm text-gray-500">
                Assigned to: {lead.assignedTo?.userName || "Unassigned"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LeadsPage;
