const express = require('express');

const router = express.Router();

const Product = require('../../models/Product');
const controller = require('./product.controller');
const { addProductValidator, startBidValidator, productIdValidator } = require('./product.validator');

// GET PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

// GET SPECIFIC PRODUCT
router.get('/:productId', productIdValidator, async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json('Product not found');
  }
});

// CREATE PRODUCT
router.post('/', addProductValidator, async (req, res) => {
  await controller.addProduct(req, res);
});

// DELETE PRODUCT
router.delete('/remove/:productId', productIdValidator, async (req, res) => {
  try {
    const deleteProduct = await Product.deleteOne({ _id: req.params.productId });
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

// START BID
router.get('/startbid/user/:userId/product/:productId', startBidValidator, async (req, res) => {
  await controller.startBidForProduct(req, res);
});

// BIDDERS ON PRODUCT
router.get('/bids/:productId', productIdValidator, async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (product) {
    res.status(200).json(product.bids);
  } else {
    res.status(404).json('No Product found for specified ID');
  }
});

module.exports = router;
