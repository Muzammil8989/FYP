// controllers/resumeController.js
const Resume = require('../models/resumeModal');

// Create a new resume
const createResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all resumes
const getAllResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().populate('candidate', 'name email');
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a resume by ID
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id).populate('candidate', 'name email');
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a resume by ID
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a resume by ID
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export all functions in a single object
module.exports = {
  createResume,
  getAllResumes,
  getResumeById,
  updateResume,
  deleteResume,
};
