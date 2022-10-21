const express = require('express');

const router = express.Router();
const { logger } = require('../../utils/logger');

const Product = require('../../models/Product');
const Bid = require('../../models/Bid');
const controller = require('./bid.controller');
const { bidProductValidator, bidIdValidator } = require('./bid.validator');

// VIEW PRODUCTS AVAILABLE TO BID
router.get('/', async (req, res) => {
  try {
    logger.info('Routing to view products');
    const availableProducts = await Product.find({ bidStatus: 'ONGOING' });
    res.status(200).json(availableProducts);
  } catch (err) {
    logger.error(`Error in view products available to bid: ${err.message}`);
    res.status(404).json('No ongoing bids found');
  }
});

// VIEW A SPECIFIC BID
router.get('/:bidId', bidIdValidator, async (req, res) => {
  logger.info('Routing to view specific bid');
  const bid = await Product.findById(req.params.bidId);
  if (bid) {
    res.status(200).json(bid);
  } else {
    logger.error('Error to view specific bid');
    res.status(404).json('Product not found');
  }
});

// BID A PRODUCT
router.post('/bidproduct', bidProductValidator, async (req, res) => {
  try {
    logger.info('Route to bid a product');
    const bid = new Bid({
      bidder: req.body.bidder,
      biddingAmount: req.body.biddingAmount,
      product: req.body.product
    });
    const bidResponse = await controller.bidProduct(req, res, bid);
    res.status(200).json(bidResponse);
  } catch (err) {
    logger.error(`Error in bidding a product ${err.message}`);
    res.status(401).json(err.message);
  }
});

module.exports = router;
