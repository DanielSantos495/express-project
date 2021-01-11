const assert = require('assert');
const proxyquire = require('proxyquire');
const {
   productMock,
   ProductServiceMock
} = require('../utils/mocks/products');

const testServer = require('../utils/testServer');

describe('routes - api - products', () => {
   const route = proxyquire('../routes/api/products', {
      '../../services/products': ProductServiceMock
   });

   const request = testServer(route);

   describe('GET /products', () => {
      it('should respond with status 200', (done) => {
         request.get('/api/products').expect(200, done)
      });

      it('should responde with content type json', (done) => {
         request.get('/api/products').expect('Content-type', /json/, done);
      });

      it('should responde with not error', (done) => {
         request.get('/api/products').end((err, res) => {
            assert.strictEqual(err, null);
            done();
         });
      });

      it('should responde with list of products', (done) => {
         request.get('/api/products').end((err, res) => {
            assert.deepStrictEqual(res.body, {
               data: productMock,
               message: 'Product listed'
            });
            done()
         });
      });

   });

});