const Joi = require('joi');
const { logger } = require('../../utils/logger');

const addProductValidator = (req, res, next) => {
  logger.info('Validating add product request');
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
    logger.error(`Bad request: ${JSON.stringify(result.error.message)}`);
    res.status(400).json({ message: result.error.message });
  }
  next();
};

const startBidValidator = (req, res, next) => {
  logger.info('Validating start bid request');
  const startBidSchema = Joi.object({
    params: {
      userId: Joi.string().alphanum().min(15).required(),
      productId: Joi.string().alphanum().min(15).required()
    }
  }).unknown(true);
  const result = startBidSchema.validate(req);
  if (result.error) {
    logger.error(`Bad request: ${JSON.stringify(result.error.message)}`);
    res.status(400).json({ message: result.error.message });
  }
  next();
};

const productIdValidator = (req, res, next) => {
  logger.info('Validating productId request');
  const productIdSchema = Joi.object({
    params: {
      productId: Joi.string().alphanum().min(15).required()
    }
  }).unknown(true);
  const result = productIdSchema.validate(req);
  if (result.error) {
    logger.error(`Bad request: ${JSON.stringify(result.error.message)}`);
    res.status(400).json({ message: result.error.message });
  }
  next();
};
module.exports = { addProductValidator, startBidValidator, productIdValidator };
