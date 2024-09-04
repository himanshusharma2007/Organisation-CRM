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
router.get("/user-leads", getUserLeads); // Place this before the `/:id` route
router.get("/lead-details/:id", getLeadById);
router.post("/:id", updateLead);
router.get("/:id", deleteLead);

module.exports = router;
