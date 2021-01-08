const express = require('express');
      router = express.Router();

const products = [
   {
      name: 'Red shoes',
      price: 75
   },
   {
      name: 'Black bike',
      price: 300
   }
];

router.get('/', (req, res, next) => {
   res.render('products', { products });
});


module.exports = router;
