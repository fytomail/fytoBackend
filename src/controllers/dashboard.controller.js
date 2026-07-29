const User = require('../models/user.model');
const Student = require('../models/student.model');
const Project = require('../models/project.model');
const AssignmentSubmission = require('../models/assignment.model');
const Company = require('../models/company.model');
const JobPost = require('../models/job.model');
const Hiring = require('../models/hiring.model');
const ApiError = require('../utils/ApiError');

const getDashboard = async (req, res, next) => {
  try {
    let studentData = null;
    let userData = null;

    if (req.user && req.user.id) {
      userData = await User.findById(req.user.id);
      if (userData && userData.role === 'student') {
        studentData = await Student.findOne({ user: userData._id });
      }
    }

    if (!studentData) {
      studentData = await Student.findOne();
    }

    const recentProjects = studentData
      ? await Project.find({ student: studentData._id }).sort({ createdAt: -1 }).limit(5)
      : await Project.find({}).sort({ createdAt: -1 }).limit(5);

    const recentAssignments = studentData
      ? await AssignmentSubmission.find({ student: studentData._id }).sort({ createdAt: -1 }).limit(5)
      : await AssignmentSubmission.find({}).sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: {
        user: userData ? userData.toJSON() : null,
        student: studentData,
        stats: {
          creditScore: studentData ? studentData.creditScore : 120,
          currentSemester: studentData ? studentData.currentSemester : 1,
          leaderboardRank: studentData ? studentData.leaderboardRank : 1,
          completedProjectsCount: recentProjects.length,
          completedAssignmentsCount: recentAssignments.length
        },
        recentProjects,
        recentAssignments
      }
    });
  } catch (error) {
    next(error);
  }
};

const getStudentDashboardById = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.params.id;
    let student = await Student.findById(studentId);
    if (!student) {
      student = await Student.findOne({ user: studentId });
    }
    if (!student) {
      throw new ApiError(404, "Student dashboard not found");
    }

    const recentProjects = await Project.find({ student: student._id }).sort({ createdAt: -1 }).limit(5);
    const recentAssignments = await AssignmentSubmission.find({ student: student._id }).sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      message: "Student dashboard retrieved successfully",
      data: {
        student,
        stats: {
          creditScore: student.creditScore || 0,
          currentSemester: student.currentSemester || 1,
          leaderboardRank: student.leaderboardRank || 1,
          completedProjectsCount: recentProjects.length,
          completedAssignmentsCount: recentAssignments.length
        },
        recentProjects,
        recentAssignments
      }
    });
  } catch (error) {
    next(error);
  }
};

const getPlatformDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalAssignments = await AssignmentSubmission.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await JobPost.countDocuments();

    res.status(200).json({
      success: true,
      message: "Platform analytics dashboard retrieved successfully",
      data: {
        totalUsers,
        totalStudents,
        totalProjects,
        totalAssignments,
        totalCompanies,
        totalJobs,
        platformHealth: 'OPERATIONAL',
        activeSemesterCount: 8
      }
    });
  } catch (error) {
    next(error);
  }
};

const getHrDashboard = async (req, res, next) => {
  try {
    const companyId = req.params.companyId || req.params.id;
    let company = null;
    if (companyId) {
      company = await Company.findById(companyId);
    }
    if (!company) {
      company = await Company.findOne();
    }

    const filter = company ? { company: company._id } : {};
    const jobs = await JobPost.find(filter);
    const candidatesCount = await Hiring.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "HR Dashboard retrieved successfully",
      data: {
        company,
        totalJobPosts: jobs.length,
        totalCandidatesApplied: candidatesCount,
        openJobs: jobs.filter(j => j.status === 'OPEN').length,
        recentJobs: jobs.slice(0, 5)
      }
    });
  } catch (error) {
    next(error);
  }
};

const getProgress = async (req, res, next) => {
  try {
    let studentData = null;
    if (req.user && req.user.id) {
      studentData = await Student.findOne({ user: req.user.id });
    }
    res.status(200).json({
      success: true,
      message: "Dashboard progress retrieved successfully",
      data: {
        currentSemester: studentData ? studentData.currentSemester : 1,
        unlockedSemesters: studentData ? studentData.unlockedSemesters : [1],
        progress: studentData ? studentData.progress : {
          completedTopics: ['JavaScript Fundamentals', 'Node.js & Express'],
          completedModules: ['Backend Architecture'],
          completedSemesters: [1]
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const getCredits = async (req, res, next) => {
  try {
    let studentData = null;
    if (req.user && req.user.id) {
      studentData = await Student.findOne({ user: req.user.id });
    }
    res.status(200).json({
      success: true,
      message: "Dashboard credits retrieved successfully",
      data: {
        creditScore: studentData ? studentData.creditScore : 150,
        breakdown: [
          { category: 'Assignments Completed', credits: 80 },
          { category: 'Capstone Projects Evaluated', credits: 70 }
        ]
      }
    });
  } catch (error) {
    next(error);
  }
};

const getRecentProjects = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user && req.user.id) {
      const student = await Student.findOne({ user: req.user.id });
      if (student) filter = { student: student._id };
    }
    const projects = await Project.find(filter).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({
      success: true,
      message: "Dashboard recent projects retrieved successfully",
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

const getRecentAssignments = async (req, res, next) => {
  try {
    let filter = {};
    if (req.user && req.user.id) {
      const student = await Student.findOne({ user: req.user.id });
      if (student) filter = { student: student._id };
    }
    const assignments = await AssignmentSubmission.find(filter).sort({ createdAt: -1 }).limit(10);
    res.status(200).json({
      success: true,
      message: "Dashboard recent assignments retrieved successfully",
      data: assignments
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getStudentDashboardById,
  getPlatformDashboard,
  getHrDashboard,
  getProgress,
  getCredits,
  getRecentProjects,
  getRecentAssignments
};
