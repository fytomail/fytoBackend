const Roadmap = require('../models/roadmap.model.js');

class RoadmapController {
  async list(req, res, next) {
    try {
      const data = await Roadmap.find(req.query);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const data = await Roadmap.findById(req.params.id);
      if (!data) {
        const error = new Error('Roadmap not found');
        error.statusCode = 404;
        return next(error);
      }
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = await Roadmap.create(req.body);
      res.status(201).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await Roadmap.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await Roadmap.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoadmapController();
