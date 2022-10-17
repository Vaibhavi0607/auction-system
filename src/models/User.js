const mongoose = require('mongoose');
// const Schema = mongoose;

const userSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    accountId: Number,
    amount: Number,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    products: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Product'
      }
    ]
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    statics: {
      findAll() {
        return this.find();
      }
    }
  }
);

module.exports = mongoose.model('Users', userSchema);
