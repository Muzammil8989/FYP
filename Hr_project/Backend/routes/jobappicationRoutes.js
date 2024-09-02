const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
} = require("../controllers/jobapplicationController"); // Adjust the path as needed

// Validation rules
const applicationValidation = [
  body("candidate")
    .notEmpty().withMessage("Candidate ID is required")
    .isMongoId().withMessage("Candidate ID must be a valid MongoDB ObjectId"),
  body("job")
    .notEmpty().withMessage("Job ID is required")
    .isMongoId().withMessage("Job ID must be a valid MongoDB ObjectId"),
  body("resume")
    .optional()
    .isString().withMessage("Resume must be a string"),
  body("coverLetter")
    .optional()
    .isString().withMessage("Cover letter must be a string"),
];

// Routes
router.post("/", applicationValidation, createApplication);
router.get("/", getAllApplications);
router.get("/:id", getApplicationById);
router.put("/:id", applicationValidation, updateApplication);
router.delete("/:id", deleteApplication);

module.exports = router;
