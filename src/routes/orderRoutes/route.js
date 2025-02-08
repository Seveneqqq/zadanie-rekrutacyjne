const express = require('express');
const router = express.Router();

const { createOrderSchema } = require('../../validators/orderValidator');
const createOrder = require('../../commands/CreateOrder');

router.post('/', async (req, res, next) => {
    try {
        const { error } = createOrderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }

        const order = await createOrder(req.body);
        res.status(201).json({
            status: 'success',
            data: order
        });
    } catch (error) {
        if (error.message.includes('Not enough products in stock') ||
            error.message.includes('does not exist')) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
        next(error);
    }
});

module.exports = router;