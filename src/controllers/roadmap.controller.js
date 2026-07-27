// Roadmap Controller
const getRoadmap = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Roadmap data" });
  } catch (error) {
    next(error);
  }
};

const getSemesters = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Semesters list" });
  } catch (error) {
    next(error);
  }
};

const getSemesterById = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Semester details" });
  } catch (error) {
    next(error);
  }
};

const getSemesterModules = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Semester modules" });
  } catch (error) {
    next(error);
  }
};

const getModuleTopics = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Module topics" });
  } catch (error) {
    next(error);
  }
};

const getTopicById = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Topic details" });
  } catch (error) {
    next(error);
  }
};

const completeTopic = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Topic marked complete" });
  } catch (error) {
    next(error);
  }
};

const unlockSemester = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Semester unlocked" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getRoadmap,
  getSemesters,
  getSemesterById,
  getSemesterModules,
  getModuleTopics,
  getTopicById,
  completeTopic,
  unlockSemester
};
