const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    resume: {
      type: String, 
    },
    coverLetter: {
      type: String, 
    }, // Correctly closed the coverLetter object
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "applications",
  }
);

module.exports = mongoose.model("Application", ApplicationSchema);
