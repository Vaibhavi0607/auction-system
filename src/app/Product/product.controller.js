const Product = require('../../models/Product');
const User = require('../../models/User');
const { logger } = require('../../utils/logger');

const startBidForProduct = async (req, res) => {
  // eslint-disable-next-line prettier/prettier
  logger.info('Controller starting bid for a product');
  const updateBidstatusProd = await Product.findOne({ $and: [{ owner: req.params.userId }, { _id: req.params.productId }] });
  if (updateBidstatusProd) {
    updateBidstatusProd.bidStatus = 'ONGOING';
    await updateBidstatusProd.save();
    res.status(200).json(updateBidstatusProd);
  } else {
    logger.error('Error finding product to bid');
    res.status(404).json({ message: 'Product not found' });
  }
};

const addProduct = async (req, res) => {
  logger.info('Controller in adding product');
  const newproduct = new Product({
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    minBidAmount: req.body.minBidAmount,
    biddingWindow: req.body.biddingWindow,
    biddingStatus: req.body.biddingStatus,
    owner: req.body.owner,
    bids: req.body.bids
  });
  const user = await User.findById(req.body.owner);
  if (!user) {
    logger.error('User not found');
    res.status(404).json({ message: 'User not found' });
  }
  try {
    user.products.push(newproduct);
    await user.save();
    await newproduct.save();
  } catch (err) {
    logger.error('Error adding products');
    res.status(500).json({ message: (err && err.message) || err });
  }

  logger.info('Product added for user');
  res.status(200).json(newproduct);
};

module.exports = { startBidForProduct, addProduct };
