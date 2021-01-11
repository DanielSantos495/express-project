const express = require('express');
      router = express.Router();
const ProductService = require('../../services/products');
      validationData = require('../../utils/middleware/validationHandler');
const {
   productIdSchema,
   productTagSchema,
   createProductSchema,
   updateProductSchema
} = require('../../utils/schemas/products');

const productService = new ProductService();

router.get('/', async (req, res, next) => {
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

// router.patch('/:productId', async (req, res, next) => {
//    const { productId } = req.params;
//    const { body: product } = req;
//    try {
//       const updateDetailProduct = await productService.updateDetailProduct({ productId, product });
//       res.status(200).json({
//          data: updateDetailProduct,
//          message: 'Product updated detail'
//       });
//    } catch(err) {
//       next(err);
//    }
// });

router.delete('/:productId', async (req, res, next) => {
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

module.exports = router;