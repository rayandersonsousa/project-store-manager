const saleServices = require('../services/saleServices');

const registerNewSale = async (req, res) => {
  const newSale = req.body;

  newSale.map((sale) => ({
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  const { id } = await saleServices.registerNewSale(newSale);

  return res.status(201).json({ id, itemsSold: req.body });
};

const getSales = async (_req, res) => {
  const sales = await saleServices.getSales();

  return res.status(200).json(sales.message[0]);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleServices.getSaleById(id);

  if (type) {
    return res.status(404).json({ message });
  }

  return res.status(200).json(message);
};

module.exports = {
  registerNewSale,
  getSales,
  getSaleById,
};