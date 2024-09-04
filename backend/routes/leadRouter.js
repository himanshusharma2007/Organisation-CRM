const express = require("express");
const router = express.Router();
const {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");
const {  adminOrSales } = require("../middleware/protectAdminOrSales");
const protectRoute = require("../middleware/protectRoute")

router.use(protectRoute); 
router.use(adminOrSales); 

router.post("/", createLead);
router.get("/", getLeads);
router.post("/:id", updateLead);
router.get("/:id", deleteLead);

module.exports = router;
