const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

const createOrder = async (orderData) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        for (const item of orderData.products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new Error(`Product with ID - ${item.productId} does not exist`);
            }
            if (product.stock < item.quantity) {
                throw new Error(`Not enough products in stock`);
            }
        }

        for (const item of orderData.products) {
            await Product.findByIdAndUpdate(
                item.productId,
                { $inc: { stock: -item.quantity } }
            );
        }

        const order = new Order(orderData);
        await order.save();

        await session.commitTransaction();
        return order;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

module.exports = createOrder;