const mongoose = require('mongoose');

const { Schema } = mongoose;

const bidSchema = new Schema(
  {
    bidder: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Users'
    },
    biddingAmount: Number,
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('Bid', bidSchema);
