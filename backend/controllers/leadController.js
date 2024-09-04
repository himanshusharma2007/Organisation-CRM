const Lead = require("../models/leadModel");

exports.createLead = async (req, res) => {
  try {
    console.log("create lead called");
    const { name, email, phone, company, status, assignedTo, notes } = req.body;
    console.log("req.body :>> ", req.body);
    const newLead = new Lead({
      name,
      email,
      phone,
      company,
      status,
      assignedTo,
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
    updatedLead=req.body;
    console.log("upated lead in update lead :>> ", updatedLead);
    // await updatedLead.save();
    console.log("lead updated successfully")
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
