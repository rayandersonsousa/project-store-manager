const connection = require('./connection');

const registerNewSale = async (date) => {
  const querry = 'INSERT INTO sales (date) VALUE (?)';
  
  const [newSale] = await connection.execute(querry, [date]);

  return { id: newSale.insertId };
};

const registerNewSaleProduct = async (id, productId, quantity) => {
  const querry = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';

  const [salesProducts] = await connection.execute(querry, [id, productId, quantity]);

  return { id: salesProducts.insertId };
};

const getSales = async () => {
  const querry = `SELECT sale_id as saleId, product_id as productId, quantity, date
  FROM StoreManager.sales_products AS products
  INNER JOIN StoreManager.sales AS sales
  ON products.sale_id = sales.id`;

  const saleProduct = await connection.execute(querry);
  
  return saleProduct;
};

const getSaleById = async (id) => {
  const querry = `SELECT product_id as productId, quantity, date
  FROM StoreManager.sales_products as products
  INNER JOIN StoreManager.sales AS sales
  ON products.sale_id = sales.id
  WHERE products.sale_id = ? `;

  const [salesProducts] = await connection.execute(querry, [id]);

  return salesProducts;
};

module.exports = {
  registerNewSale,
  registerNewSaleProduct,
  getSales,
  getSaleById,
};