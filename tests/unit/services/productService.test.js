const sinon = require('sinon');
const { expect } = require('chai');

const { products } = require('./productService.mock');
const { productsModel } = require('../../../src/models/productsModel');
const { productService } = require('../../../src/services/productService');

describe('Testes unitátios para productsModel', function () {
  it('Será validado se retorna a lista de produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(products);

    const result = await productService.getAll();

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(products);
  });

  it('Será validado se retorna um produto a partir de seu id', async function () {
    sinon.stub(productsModel, 'getById').resolves(products[2]);

    const result = await productService.getById(3);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(products[2]);
  });

  it('Será validado se retorna erro caso o id não exista', async function () {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productService.getById(73);

    expect(result.type).to.equal(404);
    expect(result.message).to.deep.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});