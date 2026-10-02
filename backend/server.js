const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Application = require("./models/Application");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// ===============================
// MongoDB Connection
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


// ===============================
// Home Route
// ===============================

app.get("/", (req, res) => {
  res.send("Job Application Tracker Backend is running!");
});


// ===============================
// GET - Get All Applications
// ===============================

app.get("/api/applications", async (req, res) => {
  try {
    const applications = await Application.find();

    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);

    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
});


// ===============================
// POST - Create Application
// ===============================

app.post("/api/applications", async (req, res) => {
  try {
    const newApplication = new Application(req.body);

    const savedApplication = await newApplication.save();

    res.status(201).json(savedApplication);
  } catch (error) {
    console.error("Error creating application:", error);

    res.status(500).json({
      message: "Failed to create application",
      error: error.message,
    });
  }
});


// ===============================
// PUT - Update Application
// ===============================

app.put("/api/applications/:id", async (req, res) => {
  try {
    const updatedApplication =
      await Application.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedApplication) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application:", error);

    res.status(500).json({
      message: "Failed to update application",
      error: error.message,
    });
  }
});


// ===============================
// DELETE - Delete Application
// ===============================

app.delete("/api/applications/:id", async (req, res) => {
  try {
    const deletedApplication =
      await Application.findByIdAndDelete(req.params.id);

    if (!deletedApplication) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);

    res.status(500).json({
      message: "Failed to delete application",
      error: error.message,
    });
  }
});


// ===============================
// Start Server
// ===============================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});