const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie.js");

module.exports.signupUser = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;

  let userWithName = await userModel.findOne({ userName });
  let userWithEmail = await userModel.findOne({ email });
  if (userWithName) {
    res.status(400).send("username already existed");
  } else if (userWithEmail) {
    res.status(400).send("this email is already registered please login");
  }
  //hash password
  console.log(req.body);

  const salt = await bcrypt.genSalt(10);
  const hashedPswd = await bcrypt.hash(password, salt);
  try {
    console.log(firstName);
    let createdUser = await userModel.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPswd,
    });
    await createdUser.save();
    // const userObject = createdUser.toObject();
    generateTokenAndSetCookie({ id: createdUser._id }, res);

    res.status(201).send(createdUser);
  } catch (error) {
    console.log("error in created the user :>> ", error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    let isPswdCorrect = await bcrypt.compare(password, user?.password || "");
    if (isPswdCorrect) {
      generateTokenAndSetCookie({id:user._id}, res);
      res.status(200).send(user).selected(-password);
    } else {
      res.status(400).send("email or password is incorrect");
    }
  } catch (error) {
    console.log("error in login user :>> ", error.message);
  }
};

module.exports.logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send("you can login");
  } catch (error) {
    console.log("error in created the user :>> ", error.message);
  }
};

module.exports.getUser = (req, res) => {
  try {
    // console.log("get user called ")
   let user=res.user;
   res.status(200).send(user);
  } catch (error) {
    console.log("error in get user :>> ", error.message);
  }
};
