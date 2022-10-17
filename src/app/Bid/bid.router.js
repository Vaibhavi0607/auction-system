const express = require('express');

const router = express.Router();

const Product = require('../../models/Product');
const Bid = require('../../models/Bid');
const controller = require('./bid.controller');

// VIEW PRODUCTS AVAILABLE TO BID
router.get('/', async (req, res) => {
  try {
    const availableProducts = await Product.find({ bidStatus: 'ONGOING' });
    res.status(200).json(availableProducts);
  } catch (err) {
    res.status(404).json('No ongoing bids found');
  }
});

// VIEW A SPECIFIC BID
router.get('/:bidId', async (req, res) => {
  const bid = await Product.findById(req.params.bidId);
  if (bid) {
    res.status(200).json(bid);
  } else {
    res.status(404).json('Product not found');
  }
});

// BID A PRODUCT
router.post('/bidproduct', async (req, res) => {
  try {
    const bid = new Bid({
      bidder: req.body.bidder,
      biddingAmount: req.body.biddingAmount,
      product: req.body.product
    });
    const bidResponse = await controller.bidProduct(req, res, bid);
    res.status(200).json(bidResponse);
  } catch (err) {
    res.status(401).json(err.message);
  }
});

module.exports = router;
