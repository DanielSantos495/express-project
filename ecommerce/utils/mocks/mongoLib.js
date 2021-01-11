const { productMock, filteredProductsMock } = require('./products');
const sinon = require('sinon');

// Esta función no hace nada, pero tienes unas propiedades para registrar cuando se llama y cuando no
const getAllStub = sinon.stub();
const tagQuery = { tags: { $in:['expensive'] } };

// Cuando se llame con 'products', resvuelve los productos
getAllStub.withArgs('products').resolves(productMock);
getAllStub.withArgs('products', tagQuery).resolves(filteredProductsMock('expensive'));

const createStub = sinon.stub().resolves('5ffb7f606707b5ab8d74d5fb');

class MongoLibMock {
   getAll(collection, query) {
      return getAllStub(collection, query);
   }

   create(collection, data) {
      return createStub(collection, data)
   }
}

module.exports = {
   getAllStub,
   createStub,
   MongoLibMock
}