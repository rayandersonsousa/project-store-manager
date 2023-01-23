const express = require('express');
const salesController = require('../controllers/salesController');
const salesValidation = require('../validations/salesValidation');

const router = express.Router();

router.post('/', salesValidation.saleIdValidation,
  salesValidation.saleQuantityValidation,
  salesController.registerNewSale);
router.get('/', salesController.getSales);
router.get('/:id', salesController.getSaleById);

module.exports = router;