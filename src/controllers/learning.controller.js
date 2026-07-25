const Learning = require('../models/learning.model.js');

class LearningController {
  async list(req, res, next) {
    try {
      const data = await Learning.find(req.query);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const data = await Learning.findById(req.params.id);
      if (!data) {
        return res.status(404).json({ status: 'error', message: 'Learning not found' });
      }
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = await Learning.create(req.body);
      res.status(201).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await Learning.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await Learning.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LearningController();
