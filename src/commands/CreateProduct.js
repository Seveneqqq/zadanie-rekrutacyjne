const Product = require('../models/Product');

const createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        return await product.save();
    } catch (error) {
        throw error;
    }
};

module.exports = createProduct;