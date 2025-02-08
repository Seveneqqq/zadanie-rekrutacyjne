const errorHandler = (err, req, res, next) => {
    
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: err.message
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid ID format'
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            status: 'error',
            message: 'Duplicate unique value'
        });
    }

    res.status(500).json({
        status: 'error',
        message: 'Sever error'
    });
};

module.exports = errorHandler;