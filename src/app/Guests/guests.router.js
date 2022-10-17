const express = require('express');

const router = express.Router();

const Product = require('../../models/Product');

// VIEW COMPLETED PRODUCTS FOR GUEST
router.get('/', async (req, res) => {
  try {
    const completedBidProducts = await Product.find({ bidStatus: 'COMPLETED' }).sort({ updated_at: -1 });
    res.status(200).json(completedBidProducts);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

module.exports = router;
