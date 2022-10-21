const User = require('../../models/User');
const Product = require('../../models/Product');
const { logger } = require('../../utils/logger');

const bidProduct = async (req, res, bid) => {
  try {
    logger.info('Controller bid product');
    const productToBid = await Product.findById(bid.product);
    // Check status for bidding
    if (productToBid.bidStatus === 'NEW') {
      res.status(500).json({ message: 'Bid has not yet began for this product' });
    } else if (productToBid.bidStatus === 'COMPLETED') {
      res.status(500).json({ message: 'Oops! Bid process is over for this product' });
    }

    // Check money for bidding
    const userToBid = await User.findById(bid.bidder);
    if (userToBid.amount <= bid.biddingAmount) {
      res.status(500).json({ message: "You don't have enough money to bid" });
    }
    if (bid.biddingAmount <= productToBid.minBidAmount) {
      res.status(500).json({ message: `You need to bid with more amount than minimum bidding amount i.e ${productToBid.minBidAmount}` });
    }

    // Bid added to product
    productToBid.bids.push(bid);
    await productToBid.save();

    return bid.save();
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { bidProduct };
