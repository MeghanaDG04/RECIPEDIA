const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to RECIPEDIA");
});

app.use("/", authRoutes);

app.use("/", userRoutes);

app.use("/", recipeRoutes);

app.use(errorHandler);

app.listen(port, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is running on port ${port}`);
});
