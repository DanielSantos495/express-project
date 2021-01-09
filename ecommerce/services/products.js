const productMock = require('../utils/mocks/products');
const MongoLib = require('../lib/monog');

class ProductService {
   constructor() {
      this.collection = 'products';
      this.mongoDB = new MongoLib();
   }

   async getProducts({ tags }) {
      const query = tags && { tags: { $in: tags } };
      const allProducts = await this.mongoDB.getAll(this.collection, query);

      return allProducts || [];
   }

   getProduct({ productId }) {
      return Promise.resolve(productMock[0]);
   }

   createProduct({ product }) {
      return Promise.resolve(productMock[0]);
   }

   updateProduct({ productId, product }) {
      return Promise.resolve(productMock[0]);
   }

   updateDetailProduct({ productId, product }) {
      return Promise.resolve(productMock[0]);
   }

   deleteProduct({ productId }) {
      return Promise.resolve(productMock[0]);
   }
}

module.exports = ProductService;