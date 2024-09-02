const { validationResult } = require("express-validator");
const Application = require("../models/jobapplicationModel"); // Adjust the path as needed

// Create a new application
const createApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error creating application." });
  }
};

// Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate("candidate job");
    res.status(200).json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching applications." });
  }
};

// Get a single application by ID
const getApplicationById = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findById(id).populate("candidate job");
    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }
    res.status(200).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching the application." });
  }
};

// Update an application
const updateApplication = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const application = await Application.findByIdAndUpdate(id, req.body, { new: true });
    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }
    res.status(200).json(application);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error updating application." });
  }
};

// Delete an application
const deleteApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const application = await Application.findByIdAndDelete(id);
    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while deleting the application." });
  }
};

module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
