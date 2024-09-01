const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const router = express.Router();
router.use(protectRoute);

router.get("/",getAllProjects);
router.post("/create",createProject);
router.get("/:id",getProjectDetails)
module.exports =router