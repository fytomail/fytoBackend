const Student = require('../models/student.model');
const User = require('../models/user.model');
const Project = require('../models/project.model');
const AssignmentSubmission = require('../models/assignment.model');
const Certificate = require('../models/certificate.model');
const ApiError = require('../utils/ApiError');

const createStudent = async (req, res, next) => {
  try {
    let studentData = { ...req.body };

    if (!studentData.user && req.user && req.user.id) {
      studentData.user = req.user.id;
    }

    if (!studentData.user) {
      const existingStudentUser = await User.findOne({ role: 'student' });
      if (existingStudentUser) {
        studentData.user = existingStudentUser._id;
      }
    }

    if (!studentData.user) {
      throw new ApiError(400, 'A valid user ID is required to create a student profile');
    }

    let student = await Student.findOne({ user: studentData.user });
    if (student) {
      Object.assign(student, studentData);
      await student.save();
    } else {
      student = await Student.create(studentData);
    }

    res.status(201).json({
      success: true,
      message: 'Student profile created/updated successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().populate('user', 'name email username role');
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: students
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.id).populate('user', 'name email username role');
    if (!student) {
      student = await Student.findOne({ user: req.params.id }).populate('user', 'name email username role');
    }
    if (!student) {
      throw new ApiError(404, 'Student profile not found');
    }
    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    let student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) {
      student = await Student.findOneAndUpdate({ user: req.params.id }, req.body, { new: true, runValidators: true });
    }
    if (!student) {
      throw new ApiError(404, 'Student profile not found');
    }
    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    next(error);
  }
};

const getStudentStats = async (req, res, next) => {
  try {
    const studentId = req.params.id;
    let student = await Student.findById(studentId);
    if (!student) {
      student = await Student.findOne({ user: studentId });
    }
    if (!student) {
      throw new ApiError(404, 'Student profile not found');
    }

    const projectsCount = await Project.countDocuments({ student: student._id });
    const assignmentsCount = await AssignmentSubmission.countDocuments({ student: student._id });
    const certificatesCount = await Certificate.countDocuments({ student: student._id });

    res.status(200).json({
      success: true,
      message: 'Student stats retrieved successfully',
      data: {
        studentId: student._id,
        creditScore: student.creditScore || 0,
        currentSemester: student.currentSemester || 1,
        unlockedSemesters: student.unlockedSemesters || [1],
        leaderboardRank: student.leaderboardRank || 1,
        completedProjectsCount: projectsCount,
        completedAssignmentsCount: assignmentsCount,
        certificatesCount: certificatesCount,
        completedTopicsCount: (student.progress && student.progress.completedTopics) ? student.progress.completedTopics.length : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

const getStudentCertificates = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.params.id;
    let student = await Student.findById(studentId);
    if (!student) {
      student = await Student.findOne({ user: studentId });
    }
    const filter = student ? { student: student._id } : { student: studentId };
    const certificates = await Certificate.find(filter);
    res.status(200).json({
      success: true,
      message: 'Student certificates retrieved successfully',
      data: certificates
    });
  } catch (error) {
    next(error);
  }
};

const getStudentPortfolio = async (req, res, next) => {
  try {
    const studentId = req.params.studentId || req.params.id;
    let student = await Student.findById(studentId).populate('user', 'name email username');
    if (!student) {
      student = await Student.findOne({ user: studentId }).populate('user', 'name email username');
    }
    if (!student) {
      throw new ApiError(404, 'Student profile not found');
    }

    const projects = await Project.find({ student: student._id });
    const certificates = await Certificate.find({ student: student._id });

    res.status(200).json({
      success: true,
      message: 'Student portfolio retrieved successfully',
      data: {
        student,
        projects,
        certificates,
        github: student.github || '',
        resume: student.resume || '',
        skills: student.skills || [],
        interests: student.interests || []
      }
    });
  } catch (error) {
    next(error);
  }
};

const getStudentSemesterProgress = async (req, res, next) => {
  try {
    const { studentId, semesterId } = req.params;
    let student = await Student.findById(studentId);
    if (!student) {
      student = await Student.findOne({ user: studentId });
    }
    if (!student) {
      throw new ApiError(404, 'Student profile not found');
    }

    const isUnlocked = student.unlockedSemesters ? student.unlockedSemesters.includes(Number(semesterId)) : true;
    res.status(200).json({
      success: true,
      message: 'Student semester progress retrieved successfully',
      data: {
        studentId: student._id,
        semesterId: Number(semesterId),
        isUnlocked,
        completedTopics: (student.progress && student.progress.completedTopics) || [],
        completedModules: (student.progress && student.progress.completedModules) || []
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  getStudentStats,
  getStudentCertificates,
  getStudentPortfolio,
  getStudentSemesterProgress
};
