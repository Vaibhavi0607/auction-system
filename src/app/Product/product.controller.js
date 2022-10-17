/* eslint-disable no-console */
const Product = require('../../models/Product');
const User = require('../../models/User');

const startBidForProduct = async (req, res) => {
  // eslint-disable-next-line prettier/prettier
  const updateBidstatusProd = await Product.findOne({ $and: [{ owner: req.params.userId }, { _id: req.params.productId }] });
  console.log(updateBidstatusProd);
  if (updateBidstatusProd) {
    updateBidstatusProd.bidStatus = 'ONGOING';
    await updateBidstatusProd.save();
    res.status(200).json(updateBidstatusProd);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

const addProduct = async (req, res) => {
  const newproduct = new Product({
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    minBidAmount: req.body.minBidAmount,
    biddingWindow: req.body.biddingWindow,
    biddingStatus: req.body.biddingStatus,
    owner: req.body.owner,
    bids: req.body.bids
  });
  try {
    const user = await User.findById(req.body.owner);
    console.log(user);
    user.products.push(newproduct);
    await user.save();
  } catch (err) {
    res.status(500).json({ message: (err && err.message) || err });
  }

  await newproduct.save().catch(err => {
    res.status(500).json({ message: (err && err.message) || err });
  });
  res.status(200).json(newproduct);
};

module.exports = { startBidForProduct, addProduct };
