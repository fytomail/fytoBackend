const Payment = require('../models/payment.model.js');

class PaymentController {
  async list(req, res, next) {
    try {
      const data = await Payment.find(req.query);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const data = await Payment.findById(req.params.id);
      if (!data) {
        const error = new Error('Payment not found');
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
      const data = await Payment.create(req.body);
      res.status(201).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await Payment.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PaymentController();
