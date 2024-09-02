const Project = require("../models/projectModel");
const Todo = require("../models/todoModel");
const User = require("../models/userModel"); // Assuming you have a User model

module.exports.getAllProjects = async (req, res) => {
  try {
    console.log("get all projects called");
    const projects = await Project.find().populate(
      "participants",
      "firstName email"
    );
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: error.message });
  }
};

module.exports.getProjectById = async (req, res) => {
  try {
    console.log("get project by id called")
    const project = await Project.findById(req.params.id).populate(
      "participants",
      "name email"
    );
    const projectTodos = await Todo.find({ project: req.params.id });
    console.log('projectTodos :>> ', project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({project, projectTodos});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching project", error: error.message });
  }
};
module.exports.getUserProjects = async (req, res) => {
  try {
    console.log("get all user  projects called");

    const projects = await Project.find({
      participants: res.user._id,
    }).populate("participants", "name email");
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user projects", error: error.message });
  }
};

module.exports.createProject = async (req, res) => {
  try {
    console.log("create project called");
    const { title, description, participantEmails } = req.body;
    console.log("req.body :>> ", req.body);

    // Find users by email
    const participants = await User.find({ email: { $in: participantEmails } });

    // Create a new instance of the Project model
    const project = new Project({
      title,
      description,
      participants: participants.map((user) => user._id),
    });

    // Save the project instance
    await project.save();
    console.log("project created successfully");
    res.status(201).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project", error: error.message });
  }
};

module.exports.updateProject = async (req, res) => {
  try {
    console.log("updated project called");

    const { title, description, participantEmails } = req.body;
    console.log("req.body :>> ", req.body);

    // Find users by email
    const participants = await User.find({ email: { $in: participantEmails } });

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        participants: participants.map((user) => user._id),
        updatedAt: Date.now(),
      },
      { new: true }
    ).populate("participants", "name email");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    console.log("project updated successfully");

    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project", error: error.message });
  }
};

module.exports.deleteProject = async (req, res) => {
  try {
    console.log("delete project called");

    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    console.log("project deleted successfully ");

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: error.message });
  }
};
