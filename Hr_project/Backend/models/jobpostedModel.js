const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company_logo: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicationsCount: {
      type: Number,
      default: 0, // Initialize with 0
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "jobs",
  }
);

module.exports = mongoose.model("Job", JobSchema);
