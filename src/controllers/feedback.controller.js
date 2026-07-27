// feedback Controller
const submitFeedback = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Submit feedback" });
  } catch (error) {
    next(error);
  }
};

const getFeedback = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get feedback" });
  } catch (error) {
    next(error);
  }
};

const getFeedbackById = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Get feedback by ID" });
  } catch (error) {
    next(error);
  }
};

const deleteFeedback = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Delete feedback" });
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
