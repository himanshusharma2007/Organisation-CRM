import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getAllProjects,
  getUserProjects,
  createProject,
} from "../services/projectService";

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    participantEmails: "",
    status: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [posterImage, setPosterImage] = useState(null);

  const {
    user,
    projects,
    setProjects,
    error,
    setError,
    loading,
    fetchProjects,
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      console.log("projects in projects page :>> ", projects);
    }
  }, [projects, loading, user]);

  const handleFileChange = (event) => {
    setPosterImage(event.target.files[0]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects
    ?.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewProject({ title: "", description: "", participantEmails: "" });
  };

  const handleCreateProject = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newProject.title);
      formData.append("description", newProject.description);
      formData.append("participantEmails", newProject.participantEmails);
      formData.append("status", newProject.status);

      if (posterImage) {
        formData.append("posterImage", posterImage);
      }

      await createProject(formData);
      setSuccessMessage("Project created successfully");
      handleCloseDialog();
      fetchProjects();
    } catch (error) {
      setError("Failed to create project");
    }
  };

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <div className="flex flex-wrap items-center mb-6">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search Projects"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {user?.role === "admin" && (
          <div className="ml-auto">
            <button
              onClick={handleOpenDialog}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects?.map((project) => (
          <div
            key={project._id}
            className="p-4 border border-gray-300 rounded shadow-sm cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleProjectClick(project._id)}
          >
            {project.posterImage && (
              <img
                src={project.posterImage}
                alt={project.title}
                loading="lazy"
                className="w-full h-48 object-cover mb-4 rounded"
              />
            )}
            <h2 className="text-xl font-semibold">{project.title}</h2>
            <p className="text-gray-600 mt-2">
              {project.description.substring(0, 100)}...
            </p>
            <div className="text-sm text-gray-500 mt-2">
              <p>
                Status:{" "}
                <span
                  className={` font-bold ${
                    project.status === "pending"
                      ? "text-yellow-500"
                      : "text-green-500"
                  } `}
                >
                  {" "}
                  {project.status}
                </span>
              </p>
              <p>
                Created At: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
            <input
              type="text"
              placeholder="Title"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
            <input
              type="text"
              placeholder="Participant Emails (comma-separated)"
              value={newProject.participantEmails}
              onChange={(e) =>
                setNewProject({
                  ...newProject,
                  participantEmails: e.target.value,
                })
              }
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <label htmlFor=""></label>
              <select
                value={newProject.status}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    status: e.target.value,
                  })
                }
                className="p-2 border rounded bg-white text-gray-700 w-full mb-4"
              >
                <option value="" disabled>
                  --select project status--
                </option>
                <option name="status" value="pending">
                  pending
                </option>
                <option name="status" value="completed">
                  completed
                </option>
              </select>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 mr-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
