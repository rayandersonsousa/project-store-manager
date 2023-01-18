const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { products } = require('./productsCrontroller.mock');
const { productsController } = require('../../../src/controllers/productsController');
const { productService } = require('../../../src/services/productService');

describe('Testes unitários de productsController', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Será validado se retorna o status 200 e lista os produtos', async function () {
    const req = {};
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getAll')
      .resolves({ type: null, message: products });
    
    await productsController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Será validado se ao buscar por um id, returna o status 200 e os dados do produto', async function () {
    const req = {
      params: { id: 3 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getById')
      .resolves({ type: null, message: products[2] });
    
    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[2]);
  });

  it('Será validado se ao buscar por um id inisistente deve apresentar um erro', async function () {
    const req = {
      params: { id: 73 },
    };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getById')
      .resolves({
        type: 404,
        message: 'Product not found',
      });
    
    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});
