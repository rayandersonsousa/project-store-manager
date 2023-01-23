const salesModel = require('../models/salesModel');

const registerNewSale = async (sale) => {
  const { id } = await salesModel.registerNewSale(new Date());

  const newSale = sale.map(async ({ productId, quantity }) => {
    await salesModel.registerNewSaleProduct(id, productId, quantity);
  });

  await Promise.all(newSale);

  return { id };
};

const getSales = async () => {
  const sales = await salesModel.getSales();

  return { message: sales };
};

const getSaleById = async (id) => {
  const sales = await salesModel.getSaleById(id);

  if (sales.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }

  return { type: null, message: sales };
};

module.exports = {
  registerNewSale,
  getSales,
  getSaleById,
};