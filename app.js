const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./src/routes/productRoutes/route');
const orderRoutes = require('./src/routes/orderRoutes/route');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error while connecting to MongoDB:', err));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Endpoint does not exist'
    });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at - http://localhost:${port}`);
});