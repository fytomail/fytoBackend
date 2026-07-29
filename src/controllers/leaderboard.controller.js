const Student = require('../models/student.model');

const getLeaderboard = async (req, res, next) => {
  try {
    const students = await Student.find()
      .sort({ creditScore: -1 })
      .select('name creditScore currentSemester university leaderboardRank avatar skills')
      .limit(100);

    const formattedLeaderboard = students.map((s, index) => ({
      rank: index + 1,
      studentId: s._id,
      name: s.name,
      creditScore: s.creditScore || 0,
      currentSemester: s.currentSemester || 1,
      university: s.university || 'Prime Wave University',
      skills: s.skills || []
    }));

    res.status(200).json({
      success: true,
      message: "Leaderboard retrieved successfully",
      data: formattedLeaderboard
    });
  } catch (error) {
    next(error);
  }
};

const getTop10 = async (req, res, next) => {
  try {
    const students = await Student.find()
      .sort({ creditScore: -1 })
      .limit(10);
    res.status(200).json({ success: true, message: "Top 10 leaderboard retrieved", data: students });
  } catch (error) {
    next(error);
  }
};

const getRank = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Rank retrieved", data: { rank: 1, creditScore: 250 } });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json({ success: true, message: "Leaderboard profile retrieved", data: student });
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
