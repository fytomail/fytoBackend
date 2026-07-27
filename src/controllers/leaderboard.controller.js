// leaderboard Controller
const getLeaderboard = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get leaderboard" });
  } catch (error) {
    next(error);
  }
};

const getTop10 = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get top 10" });
  } catch (error) {
    next(error);
  }
};

const getRank = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get rank" });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get profile" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeaderboard,
  getTop10,
  getRank,
  getProfile
};
