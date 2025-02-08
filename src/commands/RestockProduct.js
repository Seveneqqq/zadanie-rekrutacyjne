const Product = require('../models/Product');

const restockProduct = async (productId, quantity) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error(`Product with ID ${productId} does not exist`);
        }

        product.stock += quantity;
        return await product.save();
    } catch (error) {
        throw error;
    }
};

module.exports = restockProduct;