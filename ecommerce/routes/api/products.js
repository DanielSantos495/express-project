const express = require('express');
const passport = require('passport');
const ProductService = require('../../services/products');
const validationData = require('../../utils/middleware/validationHandler');
const {
   productIdSchema,
   productTagSchema,
   createProductSchema,
   updateProductSchema
} = require('../../utils/schemas/products');
const cacheResponse = require('../../utils/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../utils/time');

// JWT strategy
require('../../utils/auth/strategies/jwt');

// Patrón de inversión de control
function productsApi(app) {
   const router = express.Router();
   const productService = new ProductService();

   app.use('/api/products', router);

   router.get('/', async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;
      try {
         const products = await productService.getProducts({ tags })
         res.status(200).json({
            data: products,
            message: 'Product listed'
         });
      } catch(err) {
         next(err);
      }
   });

   router.get('/:productId', async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { productId } = req.params;
      try {
         const product = await productService.getProduct({ productId });
         res.status(200).json({
            data: product,
            message: 'Product retrieved'
         });
      } catch(err) {
         next(err);
      }
   });

   router.post('/', validationData(createProductSchema), async (req, res, next) => {
      const { body: product } = req;
      try {
         const createdProduct = await productService.createProduct({ product });
         res.status(201).json({
            data: createdProduct,
            message: 'Product listed'
         });
      } catch(err) {
         next(err);
      }
   });

   router.put(
      '/:productId',
      passport.authenticate('jwt', { session: false }),
      validationData(productIdSchema, 'params'),
      validationData(updateProductSchema),
      async (req, res, next) => {
         const { productId } = req.params;
         const { body: product } = req;
         try {
            const updateProduct = await productService.updateProduct({ productId, product });
            res.status(200).json({
               data: updateProduct,
               message: 'Product updated'
            });
         } catch(err) {
            next(err);
         }
   });

   router.delete('/:productId', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
      const { productId } = req.params;
      try {
         const productDelete = await productService.deleteProduct({ productId });
         res.status(200).json({
            data: productDelete,
            message: 'Product delete'
         });
      } catch(err) {
         next(err);
      }
   });
}

module.exports = productsApi;