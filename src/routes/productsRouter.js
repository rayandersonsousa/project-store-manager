const express = require('express');
const productsController = require('../controllers/productsController');
const productValidation = require('../validations/productValidation');

const router = express.Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productValidation.productValidation, productsController.registerNewProduct);

module.exports = router;
