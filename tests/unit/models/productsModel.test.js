const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../src/models/connection');
const { products } = require('./productsModel.mock');
const { productsModel } = require('../../../src/models/productsModel');

describe('Testes unitários de productsModel', function () {
  it('Será validado se retorna a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productsModel.getAll();

    expect(result).to.be.deep.equal(products);
  });

  it('Será validado se retorna um produto a partir de seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[products[2]]]);

    const result = await productsModel.getById(3);

    expect(result).to.be.deep.equal(products[2]);
  });

  afterEach(function () {
    sinon.restore();
  });
});