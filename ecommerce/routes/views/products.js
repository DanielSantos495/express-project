const express = require('express');
      router = express.Router();
const ProductService = require('../../services/products');

const productService = new ProductService();

router.get('/', async (req, res, next) => {
   const { tags } = req.query;
   try {
      const products = await productService.getProducts({ tags });
      res.render('products', { products });
   } catch(err) {
      next(err);
   }
});


module.exports = router;
