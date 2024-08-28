const express = require("express");
const app = express();
const authRouter = require("./routes/authRouter");
const todoRouter = require("./routes/todoRouter");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./db/connectToMongoDB");
app.use(express.json());
app.use(cookieParser());
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);


app.listen(3001, () => {
  connectMongoDB();
  console.log("server is running on the port 3000 ");
});
