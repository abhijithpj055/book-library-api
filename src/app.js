// src/app.js
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
require('dotenv').config();

const app = express();

app.use(express.json());
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes); 



app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/books", bookRoutes);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

connectDB();

module.exports = app;
