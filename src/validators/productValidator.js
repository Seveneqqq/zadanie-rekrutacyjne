const Joi = require('joi');


const createProductSchema = Joi.object({
    name: Joi.string()
        .required()
        .max(50)
        .messages({
            'string.max': 'Name cannot be longer than 50 characters',
            'string.empty': 'Name is required'
        }),
    description: Joi.string()
        .required()
        .max(50)
        .messages({
            'string.max': 'Description cannot be longer than 50 characters',
            'string.empty': 'Description is required'
        }),
    price: Joi.number()
        .positive()
        .required()
        .messages({
            'number.positive': 'Price must be greater than 0',
            'number.base': 'Price must be a number'
        }),
    stock: Joi.number()
        .min(0)
        .required()
        .messages({
            'number.min': 'Stock must be greater than 0',
            'number.base': 'Stock must be a number'
        })
});

const restockProductSchema = Joi.object({
    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.positive': 'Quantity must be greater than 0',
            'number.integer': 'Quantity must be an integer',
            'number.base': 'Quantity must be a number'
        })
});

const sellProductSchema = Joi.object({
    quantity: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            'number.positive': 'Quantity must be greater than 0',
            'number.integer': 'Quantity must be an integer',
            'number.base': 'Quantity must be a number'
        })
});

module.exports = {
    createProductSchema,
    restockProductSchema,
    sellProductSchema
};