const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: String,
    minBidAmount: Number,
    biddingWindow: {
        type: Number,
        default: 48
    },
    biddingStatus: {
        type:String,
        enum: ['NEW', 'ONGOING', 'COMPLETED'],
        default: 'NEW'
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users',
        index: true,
        required: true
    },
    bids: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Bid'
    }],
    },{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
});

module.exports = mongoose.model('Product', productSchema);