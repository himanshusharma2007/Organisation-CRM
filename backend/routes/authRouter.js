const express=require("express");
const { signupUser, loginUser, logoutUser, getUser } = require("../controllers/authController");
const protectRoute = require("../middleware/protectRoute");

const router =express.Router();
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser",protectRoute, getUser);
module.exports=router