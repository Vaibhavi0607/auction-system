const Joi = require('joi');

const addProductValidator = (req, res, next) => {
  const addProductSchema = Joi.object({
    body: {
      productName: Joi.string().required(),
      productDescription: Joi.string(),
      minBidAmount: Joi.number().required(),
      biddingWindow: Joi.string(),
      biddingStatus: Joi.string(),
      owner: Joi.string(),
      bids: Joi.array()
    }
  }).unknown(true);
  const result = addProductSchema.validate(req);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  }
  next();
};

const startBidValidator = (req, res, next) => {
  const startBidSchema = Joi.object({
    params: {
      userId: Joi.string().alphanum().min(15).required(),
      productId: Joi.string().alphanum().min(15).required()
    }
  }).unknown(true);
  const result = startBidSchema.validate(req);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  }
  next();
};

const productIdValidator = (req, res, next) => {
  const productIdSchema = Joi.object({
    params: {
      productId: Joi.string().alphanum().min(15).required()
    }
  }).unknown(true);
  const result = productIdSchema.validate(req);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  }
  next();
};
module.exports = { addProductValidator, startBidValidator, productIdValidator };
