// ai Controller
const summary = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "AI Summary" });
  } catch (error) {
    next(error);
  }
};

const ask = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "AI Ask" });
  } catch (error) {
    next(error);
  }
};

const notes = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "AI Notes" });
  } catch (error) {
    next(error);
  }
};

const explainCode = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "AI Explain Code" });
  } catch (error) {
    next(error);
  }
};

const examples = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "AI Examples" });
  } catch (error) {
    next(error);
  }
};

const hints = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "AI Hints" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  summary,
  ask,
  notes,
  explainCode,
  examples,
  hints
};
