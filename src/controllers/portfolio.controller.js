const Student = require('../models/student.model');
const Project = require('../models/project.model');
const Certificate = require('../models/certificate.model');
const ApiError = require('../utils/ApiError');

const getPortfolio = async (req, res, next) => {
  try {
    let student = null;
    if (req.user && req.user.id) {
      student = await Student.findOne({ user: req.user.id });
    }
    if (!student) {
      student = await Student.findOne();
    }
    const projects = student ? await Project.find({ student: student._id }) : [];
    const certificates = student ? await Certificate.find({ student: student._id }) : [];

    res.status(200).json({
      success: true,
      message: "Portfolio data retrieved successfully",
      data: { student, projects, certificates }
    });
  } catch (error) {
    next(error);
  }
};

const updatePortfolio = async (req, res, next) => {
  try {
    let student = null;
    if (req.user && req.user.id) {
      student = await Student.findOneAndUpdate({ user: req.user.id }, req.body, { new: true });
    }
    res.status(200).json({ success: true, message: "Portfolio updated successfully", data: student });
  } catch (error) {
    next(error);
  }
};

const getPortfolioByStudentId = async (req, res, next) => {
  try {
    const studentId = req.params.studentId;
    let student = await Student.findById(studentId);
    if (!student) {
      student = await Student.findOne({ user: studentId });
    }
    if (!student) {
      throw new ApiError(404, "Student portfolio not found");
    }
    const projects = await Project.find({ student: student._id });
    const certificates = await Certificate.find({ student: student._id });

    res.status(200).json({
      success: true,
      message: "Student portfolio data retrieved successfully",
      data: { student, projects, certificates }
    });
  } catch (error) {
    next(error);
  }
};

const connectGithub = async (req, res, next) => {
  try {
    const { githubUrl } = req.body;
    let student = null;
    if (req.user && req.user.id) {
      student = await Student.findOneAndUpdate({ user: req.user.id }, { github: githubUrl }, { new: true });
    }
    res.status(200).json({ success: true, message: "GitHub connected successfully", data: student });
  } catch (error) {
    next(error);
  }
};

const uploadResume = async (req, res, next) => {
  try {
    const { resumeUrl } = req.body;
    let student = null;
    if (req.user && req.user.id) {
      student = await Student.findOneAndUpdate({ user: req.user.id }, { resume: resumeUrl }, { new: true });
    }
    res.status(200).json({ success: true, message: "Resume uploaded successfully", data: student });
  } catch (error) {
    next(error);
  }
};

const getPublicPortfolio = async (req, res, next) => {
  try {
    const student = await Student.findOne({ 'settings.profileIsPublic': true });
    const projects = student ? await Project.find({ student: student._id }) : [];
    res.status(200).json({
      success: true,
      message: "Public portfolio data retrieved successfully",
      data: { student, projects }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPortfolio,
  updatePortfolio,
  getPortfolioByStudentId,
  connectGithub,
  uploadResume,
  getPublicPortfolio
};
