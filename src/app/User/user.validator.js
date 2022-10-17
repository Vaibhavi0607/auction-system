const Joi = require('joi');

const addUserValidator = (req, res, next) => {
  const addUserSchema = Joi.object({
    body: {
      name: Joi.string().required(),
      address: Joi.string(),
      accountId: Joi.number().required(),
      amount: Joi.number().min(1),
      email: Joi.string().email().lowercase().required(),
      password: Joi.string().min(8).required()
    }
  }).unknown(true);
  const result = addUserSchema.validate(req);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  }
  next();
};

const addMoneyValidator = (req, res, next) => {
  const addMoneySchema = Joi.object({
    body: {
      amount: Joi.number().min(0).required()
    }
  }).unknown(true);
  const result = addMoneySchema.validate(req);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  }
  next();
};

const userIdValidator = (req, res, next) => {
  const userIdSchema = Joi.object({
    params: {
      userId: Joi.string().alphanum().min(15).required()
    }
  }).unknown(true);
  const result = userIdSchema.validate(req);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  }
  next();
};
module.exports = { addUserValidator, addMoneyValidator, userIdValidator };
