const express = require('express');
      productMock = require('../../utils/mocks/products');
      router = express.Router();


router.get('/', (req, res, next) => {
   res.status(200).json({
      data: productMock,
      message: 'Product listed'
   });
});

router.get('/:productId', (req, res, next) => {
   const { productId } = req.params;
   res.status(200).json({
      data: productMock[0],
      message: 'Product retrieved'
   });
});

router.post('/', (req, res, next) => {
   res.status(201).json({
      data: productMock[0],
      message: 'Product listed'
   });
});

router.put('/:productId', (req, res, next) => {
   res.status(200).json({
      data: productMock[0],
      message: 'Product updated'
   });
});

router.delete('/', (req, res, next) => {
   res.status(200).json({
      data: productMock[0],
      message: 'Product delete'
   });
});

module.exports = router;