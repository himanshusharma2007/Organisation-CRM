import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../context/AuthContext";
import {
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/projectService";
import EditTodoModal from "../components/Todo/EditTodoModal";
import TodoList from "../components/Todo/TodoList";
import ViewTodoModal from "../components/Todo/ViewTodoModal";
import { deleteTodo, updateTodo } from "../services/todoService";

const ProjectDetailsPage = () => {
  const [project, setProject] = useState(null);
  const [projectTodos, setProjectTodos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedProject, setEditedProject] = useState({});
  const [editingTodo, setEditingTodo] = useState(null);
  const [viewTodo, setViewTodo] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const handleEditTodo = (todoId) => {
    const todoToEdit = projectTodos.find((todo) => todo._id === todoId);
    setEditingTodo(todoToEdit);
  };
  const handleViewTodo = (todoId) => {
    console.log("handleViewTodo called todoId :>> ", todoId);
    setViewTodo(projectTodos.find((todo) => todo._id === todoId));
  };

  const handleUpdateTodo = async (todoId, todoData) => {
    try {
      const updatedTodo = await updateTodo(todoId, todoData);
      setProjectTodos(projectTodos.map((todo) => (todo._id === todoId ? updatedTodo : todo)));
    } catch (err) {
      setError("Failed to update todo");
      console.log('error in update todo :>> ', err);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await deleteTodo(todoId);
      setProjectTodos(projectTodos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };
  const fetchProjectDetails = async () => {
    try {
      const data = await getProjectById(id);
      console.log('data in fetch from api:>> ', data);
      setProject(data?.project);
      setProjectTodos(data?.projectTodos);
      setEditedProject({
        ...data.project,
        participantEmails: data.project.participants
          .map((p) => p.email)
          .join(", "),
      });
    } catch (error) {
      setError("Failed to fetch project details");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = async () => {
    try {
      // Convert the comma-separated string into an array of emails
      const participantEmailsArray = editedProject.participantEmails
        .split(",")
        .map((email) => email.trim()); // Trim any extra spaces

      // Create a new object for the edited project with the updated participants array
      const updatedProject = {
        ...editedProject,
        participants: participantEmailsArray.map((email) => ({ email })),
      };

      // Call the update function with the modified project data
      await updateProject(id, updatedProject);
      setProject(updatedProject);
      setOpenEditDialog(false);
      setError("Project updated successfully");
    } catch (error) {
      setError("Failed to update project");
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        navigate("/projects");
      } catch (error) {
        setError("Failed to delete project");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return <p className="text-center text-xl">No project found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-4">{project.description}</p>
      <p className="text-sm text-gray-600">
        Created at: {format(new Date(project.createdAt), "PPpp")}
      </p>
      <h2 className="text-xl font-semibold mt-6">Participants:</h2>
      <ul className="list-disc pl-5">
        {project.participants.map((participant) => (
          <li key={participant._id} className="my-2">
            <p className="font-medium">{participant.name}</p>
            <p className="text-sm text-gray-500">{participant.email}</p>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-6">Status:</h2>
      <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold mb-4">
        {project.status || "In Progress"}
      </span>
      <TodoList
        todos={projectTodos}
        onEdit={handleEditTodo}
        onView={handleViewTodo}
        onDelete={handleDeleteTodo}
      />
      <EditTodoModal
        isOpen={!!editingTodo}
        onClose={() => setEditingTodo(null)}
        onSave={handleUpdateTodo}
        todo={editingTodo}
      />
      <ViewTodoModal
        isOpen={!!viewTodo}
        onClose={() => setViewTodo(null)}
        todo={viewTodo}
      />
      {user?.role === "admin" && (
        <div className="flex space-x-4 mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => setOpenEditDialog(true)}
          >
            Edit Project
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={handleDeleteProject}
          >
            Delete Project
          </button>
        </div>
      )}
      {openEditDialog && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
              <input
                className="w-full border border-gray-300 p-2 rounded mb-4"
                type="text"
                placeholder="Title"
                value={editedProject.title}
                onChange={(e) =>
                  setEditedProject({ ...editedProject, title: e.target.value })
                }
              />
              <textarea
                className="w-full border border-gray-300 p-2 rounded mb-4"
                placeholder="Description"
                rows="4"
                value={editedProject.description}
                onChange={(e) =>
                  setEditedProject({
                    ...editedProject,
                    description: e.target.value,
                  })
                }
              />
              <input
                className="w-full border border-gray-300 p-2 rounded mb-4"
                type="text"
                placeholder="Participant Emails (comma-separated)"
                value={editedProject.participantEmails}
                onChange={(e) =>
                  setEditedProject({
                    ...editedProject,
                    participantEmails: e.target.value,
                  })
                }
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
                  onClick={() => setOpenEditDialog(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={handleEditProject}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="fixed bottom-0 right-0 mb-4 mr-4">
          <div className={`bg-red-500 text-white p-4 rounded-lg`}>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
