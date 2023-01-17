require('dotenv').config();
const express = require('express');
const app = require('./app');

const PORT = process.env.APP_PORT;

const productsController = require('./controllers/productsController');

app.use(express.json());

app.get('/products', productsController.getAll);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
