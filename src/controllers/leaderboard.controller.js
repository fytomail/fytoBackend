const Leaderboard = require('../models/leaderboard.model.js');

class LeaderboardController {
  async list(req, res, next) {
    try {
      const data = await Leaderboard.find(req.query);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const data = await Leaderboard.findById(req.params.id);
      if (!data) {
        const error = new Error('Leaderboard not found');
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
      const data = await Leaderboard.create(req.body);
      res.status(201).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await Leaderboard.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LeaderboardController();
