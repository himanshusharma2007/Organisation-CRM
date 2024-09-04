const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  getUserLeads,
  getLeadById,
} = require("../controllers/leadController");
const { adminOrSales } = require("../middleware/protectAdminOrSales");
const protectRoute = require("../middleware/protectRoute");

router.use(protectRoute);
router.use(adminOrSales);

router.post("/", createLead);
router.get("/", getLeads);
router.post("/:id", updateLead);
router.get("/:id", deleteLead);
router.get("/user-leads", getUserLeads);
router.get("/lead-details/:id", getLeadById);
module.exports = router;
