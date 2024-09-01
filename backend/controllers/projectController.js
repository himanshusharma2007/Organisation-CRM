const { projectModel } = require("../models/projectModel");

module.exports.getAllProjects = async (req, res) => {
  const user = res.user;
  try {
    if (user.role === "admin") {
      const projects = await projectModel.find();
      res.status(200).send(projects);
    }
  } catch (error) {
    console.log("error in in get all projects :>> ", error.message);
    res.status(400).send("unable to fetch projects");
  }
};

module.exports.createProjects = async (req, res) => {
  try {
    const { title, discription, participantsEmails } = req.body;
    let createdProject = await projectModel({
      title,
      discription,
      participants,
    }); participantsEmails.map(());
    if (createdProject) {
      res.status(200).send(createdProject);
    }
    res.status(400).send("unable to create projects");
  } catch (error) {
    console.log("error in in create projects :>> ", error.message);
    res.status(400).send("unable to create projects");
  }
};
