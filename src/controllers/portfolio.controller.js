// Portfolio Controller
const getPortfolio = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Portfolio data" });
  } catch (error) {
    next(error);
  }
};

const updatePortfolio = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Portfolio updated" });
  } catch (error) {
    next(error);
  }
};

const getPortfolioByStudentId = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Student portfolio data" });
  } catch (error) {
    next(error);
  }
};

const connectGithub = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "GitHub connected" });
  } catch (error) {
    next(error);
  }
};

const uploadResume = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Resume uploaded" });
  } catch (error) {
    next(error);
  }
};

const getPublicPortfolio = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Public portfolio data" });
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
