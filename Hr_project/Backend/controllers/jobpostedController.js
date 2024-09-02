const JobPosted = require("../models/jobpostedModel");
const mongoose = require("mongoose");

const createJob = async (req, res) => {
  const { title, description, company, location, salary } = req.body;

  // Validate the input fields
  if (!title || !description || !company || !location || !salary) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  try {
    // Create a new job posting
    const newJob = new JobPosted({
      company_logo,
      title,
      description,
      company,
      location,
      salary,
      postedBy: req.user.id, // Assuming req.user is populated with the authenticated user's info
    });

    // Save the job posting to the database
    const savedJob = await newJob.save();
    res.status(201).json(savedJob); // Return 201 status for successful creation
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(500)
      .json({ error: "An error occurred while creating the job." });
  }
};

// Fetch all job postings
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobPosted.find({}).populate("postedBy");

    // Map over jobs to set postedBy to null
    const modifiedJobs = jobs.map((job) => {
      return {
        ...job.toObject(), // Convert mongoose document to plain object
        postedBy: null, // Set postedBy to null
      };
    });

    res.status(200).json(modifiedJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching jobs." });
  }
};

// Fetch a single job posting by ID
const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await JobPosted.findById(id).populate("postedBy", "name email");
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the job." });
  }
};

// Update a job posting
const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company_logo, title, description, company, location, salary } =
    req.body;

  try {
    const job = await JobPosted.findByIdAndUpdate(
      id,
      { company_logo, title, description, company, location, salary },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the job." });
  }
};

// Delete a job posting
const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await JobPosted.findByIdAndDelete(id);
    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }
    res.status(200).json({ msg: "Job deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the job." });
  }
};

module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
