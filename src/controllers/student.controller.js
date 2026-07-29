const Student = require('../models/student.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const createStudent = async (req, res, next) => {
  try {
    let studentData = { ...req.body };

    // Link user if available in request or find associated user
    if (!studentData.user && req.user && req.user.id) {
      studentData.user = req.user.id;
    }

    if (!studentData.user) {
      // Default to finding a student user or creating a fallback user reference
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
    const student = await Student.findById(req.params.id).populate('user', 'name email username role');
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
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
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

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent
};
