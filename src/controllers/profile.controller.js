const Profile = require('../models/profile.model.js');

class ProfileController {
  async list(req, res, next) {
    try {
      const data = await Profile.find(req.query);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const data = await Profile.findById(req.params.id);
      if (!data) {
        return res.status(404).json({ status: 'error', message: 'Profile not found' });
      }
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = await Profile.create(req.body);
      res.status(201).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await Profile.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProfileController();
