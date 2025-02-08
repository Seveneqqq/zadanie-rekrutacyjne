const express = require('express');
const router = express.Router();

const { createProductSchema, restockProductSchema, sellProductSchema } = require('../../validators/productValidator');
const createProduct = require('../../commands/CreateProduct');
const restockProduct = require('../../commands/RestockProduct');
const sellProduct = require('../../commands/SellProduct');
const getProducts = require('../../queries/GetProducts');


router.get('/', async (req, res, next) => {
    try {
        const products = await getProducts();
        res.status(200).json({
            status: 'success',
            data: products
        });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { error } = createProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }
        
        const product = await createProduct(req.body);
        res.status(201).json({
            status: 'success',
            data: product
        });
    } catch (error) {
        next(error);
    }
});

router.post('/:id/restock', async (req, res, next) => {
    try {
        const { error } = restockProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }

        const product = await restockProduct(req.params.id, req.body.quantity);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product does not exist'
            });
        }

        res.status(200).json({
            status: 'success',
            data: product
        });
    } catch (error) {
        next(error);
    }
});

router.post('/:id/sell', async (req, res, next) => {
    try {
        const { error } = sellProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }

        const product = await sellProduct(req.params.id, req.body.quantity);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product does not exist'
            });
        }

        res.status(200).json({
            status: 'success',
            data: product
        });
    } catch (error) {
        if (error.message === 'Not enough products in stock') {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
        next(error);
    }
});

module.exports = router;