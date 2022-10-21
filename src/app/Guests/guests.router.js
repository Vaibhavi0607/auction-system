const express = require('express');

const router = express.Router();
const { logger } = require('../../utils/logger');

const Product = require('../../models/Product');

// VIEW COMPLETED PRODUCTS FOR GUEST
router.get('/', async (req, res) => {
  try {
    logger.info('Fetching list of completed bif products for guests');
    const completedBidProducts = await Product.find({ bidStatus: 'COMPLETED' }).sort({ updated_at: -1 });
    res.status(200).json(completedBidProducts);
  } catch (err) {
    logger.error(`Error in fetching completed bids for guests ${err.message}`);
    res.status(404).json(err.message);
  }
});

module.exports = router;
