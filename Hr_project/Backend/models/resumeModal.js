const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (the candidate)
      required: true,
    },
    filePath: {
      type: String,
      required: true, // Store the path or URL to the resume file
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    // New fields for extracted information
    name: {
      type: String,
      required: true,
    },
    contact_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    skills: {
      type: [String], // Array of strings for skills
      default: [],
    },
    education: {
      type: String,
      required: true,
    },
    colleges: {
      type: [String], // Array of strings for colleges
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "resumes",
  }
);

module.exports = mongoose.model("Resume", ResumeSchema);
