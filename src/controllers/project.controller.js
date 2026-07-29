const Project = require('../models/project.model');
const Student = require('../models/student.model');
const ApiError = require('../utils/ApiError');

const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('student');
    res.status(200).json({
      success: true,
      message: "Projects retrieved successfully",
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate('student');
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    res.status(200).json({
      success: true,
      message: "Project retrieved successfully",
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    let projectData = { ...req.body };

    if (!projectData.student && req.user && req.user.id) {
      const studentProfile = await Student.findOne({ user: req.user.id });
      if (studentProfile) {
        projectData.student = studentProfile._id;
      }
    }

    if (!projectData.student) {
      const firstStudent = await Student.findOne();
      if (firstStudent) {
        projectData.student = firstStudent._id;
      }
    }

    if (!projectData.student) {
      throw new ApiError(400, "A valid student ID is required to associate with the project");
    }

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project
    });
  } catch (error) {
    next(error);
  }
};

const uploadProject = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Upload project" });
  } catch (error) {
    next(error);
  }
};

const submitProject = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Submit project" });
  } catch (error) {
    next(error);
  }
};

const evaluateProject = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Evaluate project" });
  } catch (error) {
    next(error);
  }
};

const getReport = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Project report" });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Project history" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  uploadProject,
  submitProject,
  evaluateProject,
  getReport,
  getHistory
};
