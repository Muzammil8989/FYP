const express = require("express");
const { check } = require("express-validator");
const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobpostedController");
const auth = require("../middleware/auth");

const router = express.Router();

// @route POST api/jobs
// @desc Create a new job
router.post(
  "/jobspost",
  // Ensure the user is authenticated
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("company", "Company name is required").not().isEmpty(),
    check("location", "Location is required").not().isEmpty(),
    check("salary", "Salary is required").isNumeric(),
  ],
  createJob
);

// @route GET api/jobs
// @desc Get all jobs
router.get("/getJobs", getAllJobs);

// @route GET api/jobs/:id
// @desc Get a job by ID
router.get("/getJobById/:id", getJobById);

// @route PUT api/jobs/:id
// @desc Update a job by ID
router.put(
  "/updateJob/:id",
  auth, // Ensure the user is authenticated
  [
    check("title", "Title is required").optional().not().isEmpty(),
    check("description", "Description is required").optional().not().isEmpty(),
    check("company", "Company name is required").optional().not().isEmpty(),
    check("location", "Location is required").optional().not().isEmpty(),
    check("salary", "Salary is required").optional().isNumeric(),
  ],
  updateJob
);

// @route DELETE api/jobs/:id
// @desc Delete a job by ID
router.delete("/deleteJob/:id", auth, deleteJob);

module.exports = router;
