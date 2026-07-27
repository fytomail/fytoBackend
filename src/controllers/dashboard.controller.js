// Dashboard Controller
const getDashboard = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Dashboard data" });
  } catch (error) {
    next(error);
  }
};

const getProgress = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Dashboard progress" });
  } catch (error) {
    next(error);
  }
};

const getCredits = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Dashboard credits" });
  } catch (error) {
    next(error);
  }
};

const getRecentProjects = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Dashboard recent projects" });
  } catch (error) {
    next(error);
  }
};

const getRecentAssignments = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Dashboard recent assignments" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getProgress,
  getCredits,
  getRecentProjects,
  getRecentAssignments
};
