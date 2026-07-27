// auth Controller
const login = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Login" });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Logout" });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Refresh JWT" });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Forgot password" });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Reset password" });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Logged-in user" });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Change password" });
  } catch (error) {
    next(error);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "Verify JWT" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  profile,
  changePassword,
  verifyToken
};
