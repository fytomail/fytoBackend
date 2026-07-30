const Feedback = require('../models/feedback.model');
const ApiError = require('../utils/ApiError');

// feedback Controller
const submitFeedback = async (req, res, next) => {
  try {
    const studentId = req.user ? req.user.id : req.body.student;
    if (!studentId) {
      throw new ApiError(400, "Student ID is required to submit feedback.");
    }
    const feedback = await Feedback.create({
      ...req.body,
      student: studentId
    });
    res.status(201).json({ success: true, message: "Feedback submitted successfully", data: feedback });
  } catch (error) {
    next(error);
  }
};

const getFeedback = async (req, res, next) => {
  try {
    const feedbackList = await Feedback.find().populate('student').sort({ createdAt: -1 });
    res.status(200).json({ success: true, message: "Feedback retrieved successfully", data: feedbackList });
  } catch (error) {
    next(error);
  }
};

const getFeedbackById = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('student');
    if (!feedback) {
      throw new ApiError(404, "Feedback not found");
    }
    res.status(200).json({ success: true, message: "Feedback retrieved successfully", data: feedback });
  } catch (error) {
    next(error);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      throw new ApiError(404, "Feedback not found");
    }
    res.status(200).json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitFeedback,
  getFeedback,
  getFeedbackById,
  deleteFeedback
};
