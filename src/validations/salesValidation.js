const productsModel = require('../models/productsModel');

const saleIdValidation = async (req, res, next) => {
  const sale = req.body;

  const products = await productsModel.getAll();

  const valId = sale.some(({ productId }) => productId);

  if (!valId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const valProductId = sale.filter((sal) => sal.productId > products[products.length - 1].id);

  if (valProductId.length) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const saleQuantityValidation = (req, res, next) => {
  const sale = req.body;

  const valQuantity = sale.some(({ quantity }) => quantity === undefined);

  if (valQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  const invQuantity = sale.some(({ quantity }) => quantity <= 0);

  if (invQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  saleIdValidation,
  saleQuantityValidation,
};