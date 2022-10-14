const mongoose = require('mongoose');
// const Schema = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    accountId: Number,
    amount: {
        type: Number,
        required: true
    },
    email: String,
    },{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
});
module.exports =  mongoose.model('Users', userSchema);
