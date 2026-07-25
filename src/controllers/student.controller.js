const Student = require('../models/student.model');
const ApiError = require('../utils/ApiError');

class StudentController {
  async getProfile(req, res, next) {
    try {
      const profile = await Student.findOne({ user: req.user.id });
      if (!profile) {
        throw new ApiError(404, 'Student profile not found.');
      }
      res.status(200).json({
        status: 'success',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  async createProfile(req, res, next) {
    try {
      const existingProfile = await Student.findOne({ user: req.user.id });
      if (existingProfile) {
        throw new ApiError(400, 'Student profile already exists for this user.');
      }
      
      const profileData = {
        user: req.user.id,
        ...req.body,
        activity: [{ action: 'Created profile', timestamp: new Date() }]
      };
      const profile = await Student.create(profileData);

      res.status(201).json({
        status: 'success',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const profile = await Student.findOneAndUpdate(
        { user: req.user.id },
        { 
          $set: req.body,
          $push: { activity: { action: 'Updated profile details', timestamp: new Date() } }
        },
        { new: true, runValidators: true }
      );
      
      if (!profile) {
        throw new ApiError(404, 'Student profile not found.');
      }

      res.status(200).json({
        status: 'success',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
