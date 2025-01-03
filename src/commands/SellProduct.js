const Product = require('../models/Product');

const sellProduct = async (productId, quantity) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error(`Product with id ${productId} does not exist`);
        }

        if (product.stock < quantity) {
            throw new Error(`Not enough products in stock`);
        }

        product.stock -= quantity;
        return await product.save();
    } catch (error) {
        throw error;
    }
};

module.exports = sellProduct;