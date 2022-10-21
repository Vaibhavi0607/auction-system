const express = require('express');

const router = express.Router();
const { logger } = require('../../utils/logger');

const Product = require('../../models/Product');
const controller = require('./product.controller');
const { addProductValidator, startBidValidator, productIdValidator } = require('./product.validator');

// GET PRODUCTS
router.get('/', async (req, res) => {
  try {
    logger.info('Getting products');
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    logger.error(`Error in getting products ${err.message}`);
    res.status(404).json(err.message);
  }
});

// GET SPECIFIC PRODUCT
router.get('/:productId', productIdValidator, async (req, res) => {
  logger.info('Getting specific product');
  const product = await Product.findById(req.params.productId);
  if (product) {
    res.status(200).json(product);
  } else {
    logger.error('Product not found');
    res.status(404).json('Product not found');
  }
});

// CREATE PRODUCT
router.post('/', addProductValidator, async (req, res) => {
  logger.info('Adding product for user');
  await controller.addProduct(req, res);
});

// DELETE PRODUCT
router.delete('/remove/:productId', productIdValidator, async (req, res) => {
  try {
    logger.info('Deleting product');
    const deleteProduct = await Product.deleteOne({ _id: req.params.productId });
    res.status(200).json(deleteProduct);
  } catch (err) {
    logger.error(`Error deleting product for user ${err.message}`);
    res.status(404).json(err.message);
  }
});

// START BID
router.get('/startbid/user/:userId/product/:productId', startBidValidator, async (req, res) => {
  logger.info('Starting bid for product');
  await controller.startBidForProduct(req, res);
});

// BIDDERS ON PRODUCT
router.get('/bids/:productId', productIdValidator, async (req, res) => {
  logger.info('Fetching bidders on particular product');
  const product = await Product.findById(req.params.productId);
  if (product) {
    res.status(200).json(product.bids);
  } else {
    logger.error('Product not found to view bidders on it');
    res.status(404).json('No Product found for specified ID');
  }
});

module.exports = router;
