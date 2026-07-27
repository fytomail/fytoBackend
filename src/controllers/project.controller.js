// project Controller
const getProjects = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get projects" });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get project" });
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Create project" });
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
  uploadProject,
  submitProject,
  evaluateProject,
  getReport,
  getHistory
};
