const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error while connecting to MongoDB:', err));

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at - ${port}`);
});