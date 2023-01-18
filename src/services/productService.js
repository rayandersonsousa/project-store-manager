const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (!product) {
    return { type: 404, message: 'Product not found' };
  }

  return { type: null, message: product };
};

const registerNewProduct = async (name) => {
  const products = await productsModel.registerNewProduct(name);

  const newProduct = await productsModel.getById(products);

  return { type: null, message: newProduct };
};

module.exports = {
  getAll,
  getById,
  registerNewProduct,
};
