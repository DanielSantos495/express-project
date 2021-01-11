const assert = require('assert');
const proxyquire = require('proxyquire');
const {
   getAllStub,
   createStub,
   MongoLibMock
} = require('../utils/mocks/mongoLib');
const {
   productMock,
   filteredProductsMock
} = require('../utils/mocks/products');

describe('services - products', () => {
   const ProductsService = proxyquire('../services/products', {
      '../lib/monog': MongoLibMock
   });

   const productsService = new ProductsService();

   describe('when getProducts method is called', async () => {
      it('should call the getAkk MongoLib method', async () => {
         await productsService.getProducts({});
         assert.strictEqual(getAllStub.called, true)
      });

      it('should return an array of products', async () => {
         const result = await productsService.getProducts({});
         const expect = productMock;
         assert.deepStrictEqual(result, expect);
      });
   });

   describe('when getProducts method id called with tags', async () => {
      it('should all the getAll MongoLib method with tags args', async () => {
         await productsService.getProducts({ tags: ['expensive'] });
         const tagQuery = { tags: { $in: ['expensive'] } };
         assert.strictEqual(getAllStub.calledWith('products', tagQuery), true)
      });

      it('should return an array of products filtered by the tag', async () => {
         const result = await productsService.getProducts({ tags: ['expensive'] });
         const expect = filteredProductsMock('expensive');
         assert.deepStrictEqual(result, expect);
      })
   })

})