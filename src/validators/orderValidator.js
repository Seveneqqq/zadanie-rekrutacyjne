const Joi = require('joi');

const createOrderSchema = Joi.object({
    customerId: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.base': 'Customer ID must be a number',
            'number.integer': 'Customer ID must be an integer',
            'number.positive': 'Customer ID must be greater than 0',
            'any.required': 'Customer ID is required'
        }),
    products: Joi.array()
        .items(
            Joi.object({
                productId: Joi.string()
                    .required()
                    .messages({
                        'string.empty': 'Product ID is required',
                        'string.base': 'Product ID must be a string'
                    }),
                quantity: Joi.number()
                    .integer()
                    .positive()
                    .required()
                    .messages({
                        'number.positive': 'Quantity must be greater than 0',
                        'number.integer': 'Quantity must be an integer',
                        'number.base': 'Quantity must be a number'
                    })
            })
        )
        .min(1)
        .required()
        .messages({
            'array.min': 'Order must contain minimum 1 product',
            'array.base': 'Products array is required'
        })
});

module.exports = {
    createOrderSchema
};