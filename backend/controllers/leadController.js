const Lead = require("../models/leadModel");
const User = require("../models/userModel");

exports.createLead = async (req, res) => {
  try {
    console.log("create lead called");
    const { name, email, phone, company, status, assignedTo, notes } = req.body;
    console.log("req.body :>> ", req.body);
    const salesPerson = await User.findOne({ _id: assignedTo });
    if (!salesPerson.department === "sales") {
      res.status(400).json({
        message: "Error creating lead assined person is not autherized ",
      });
    }
    const newLead = new Lead({
      name,
      email,
      phone,
      company,
      status,
      assignedTo: salesPerson._id,
      notes,
    });
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating lead", error: error.message });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate("assignedTo", "userName");
    res.status(200).json(leads);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leads", error: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    console.log("update lead called");
    const { id } = req.params;
    let updatedLead = await Lead.findOne({ _id: id });
    updatedLead = req.body;
    console.log("upated lead in update lead :>> ", updatedLead);
    // await updatedLead.save();
    console.log("lead updated successfully");
    if (!updatedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json(updatedLead);
  } catch (error) {
    console.log("error in update lead:>> ", error);

    res
      .status(400)
      .json({ message: "Error updating lead", error: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    console.log("delete lead called")
    const { id } = req.params;
    const deletedLead = await Lead.findByIdAndDelete(id);
    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting lead", error: error.message });
  }
};

exports.getUserLeads = async (req, res) => {
  try {
    console.log("get user leads called");
    let user = res.user;
    const leads = await Lead.find({ assignedTo: user._id }).populate(
      "assignedTo"
    );
    console.log("leads :>> ", leads);
    res.status(200).json(leads).selected(-assignedTo.password);
  } catch (error) {
     console.log("error in get user leads :>> ", error);
    res
      .status(500)
      .json({ message: "Error fetching user leads", error: error.message });
  }
};

exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("get lead by id called", id);
    const lead = await Lead.findOne({ _id: id }).populate("assignedTo");
    console.log("lead inget lead by id:>> ", lead);
    res.status(200).json(lead).selected(-assignedTo.password);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching leads", error: error.message });
  }
};
