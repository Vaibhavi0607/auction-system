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
    logger.info('Request to view products');
    const availableProducts = await Product.find({ bidStatus: 'ONGOING' });
    res.status(200).json(availableProducts);
  } catch (err) {
    logger.error(`Error in view products available to bid: ${err.message}`);
    res.status(500).json({ message: 'No ongoing bids found' });
  }
});

// VIEW A SPECIFIC BID
router.get('/:bidId', bidIdValidator, async (req, res) => {
  logger.info('Request to view bid by id');
  const bid = await Product.findById(req.params.bidId);
  if (bid) {
    res.status(200).json(bid);
  } else {
    logger.error('Error in view bid by id');
    res.status(500).json({ message: 'Product not found' });
  }
});

// BID A PRODUCT
router.post('/bidproduct', bidProductValidator, async (req, res) => {
  try {
    logger.info('Request to bid a product');
    const bid = new Bid({
      bidder: req.body.bidder,
      biddingAmount: req.body.biddingAmount,
      product: req.body.product
    });
    const bidResponse = await controller.bidProduct(req, res, bid);
    res.status(200).json({ message: bidResponse });
  } catch (err) {
    logger.error(`Error in bidding a product ${err.message}`);
    res.status(401).json({ message: err.message });
  }
});

// REMOVE BID
router.delete('/remove/:bidId', bidIdValidator, async (req, res) => {
  logger.info('Request for deleting bid by bid id');
  try {
    const deleteBid = await Bid.deleteOne({ _id: req.params.bidId });
    res.status(200).json(deleteBid);
  } catch (err) {
    logger.error(`Error deleting bid ${err.message}`);
    res.status(500).json(err.message);
  }
});
module.exports = router;
