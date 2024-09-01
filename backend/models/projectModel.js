const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    discription: {
      type: String,
      required: true,
    },
    participants: {
      type:[mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
  },
  { timestamp: true }
);

module.exports.projectModel=mongoose.model("Project",projectSchema)
