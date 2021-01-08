const express = require('express');
      path = require('path');
      productsRouter = require('./routes/products');
      productsApiRouter = require('./routes/api/products');
      app = express();

app.use('/static', express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);

const server = app.listen(8000, () => {
   console.log(`Listening http://localhost:${server.address().port}`);
});