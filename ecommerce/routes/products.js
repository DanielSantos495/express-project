const express = require('express');
      productMock = require('../utils/mocks/products');
      router = express.Router();

router.get('/', (req, res, next) => {
   res.render('products', { productMock });
});


module.exports = router;
