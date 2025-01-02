const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
        type: Number,
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }]
});

module.exports = mongoose.model('Order', orderSchema);