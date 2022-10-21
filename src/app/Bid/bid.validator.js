const Joi = require('joi');
const { logger } = require('../../utils/logger');

const bidProductValidator = (req, res, next) => {
  logger.info('Validating start bid request');
  const bidProductSchema = Joi.object({
    body: {
      bidder: Joi.string().min(15),
      biddingAmount: Joi.number().required(),
      product: Joi.string().min(15)
    }
  }).unknown(true);

  const result = bidProductSchema.validate(req);
  if (result.error) {
    logger.error(`Bad request: ${JSON.stringify(result.error.message)}`);
    res.status(400).json(result.error.message);
  }
  next();
};

const bidIdValidator = (req, res, next) => {
  logger.info('Validating bidId request');
  const bidIdSchema = Joi.object({
    params: {
      bidId: Joi.string().alphanum().min(15).required()
    }
  }).unknown(true);
  const result = bidIdSchema.validate(req);
  if (result.error) {
    logger.error(`Bad request: ${JSON.stringify(result.error.message)}`);
    res.status(400).json(result.error.message);
  }
  next();
};

module.exports = { bidProductValidator, bidIdValidator };
