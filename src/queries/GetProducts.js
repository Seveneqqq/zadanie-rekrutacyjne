const Product = require('../models/Product');

const getProducts = async () => {
    try {
        return await Product.find();
    } catch (error) {
        throw error;
    }
};

module.exports = getProducts;