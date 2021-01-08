const express = require('express');
      path = require('path');
      productsRouter = require('./routes/products');
      app = express();

app.get('/', (req, res, next) => {
   res.send({ hello: 'Hello', world: 'World' });
});

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use('/products', productsRouter);

const server = app.listen(8000, () => {
   console.log(`Listening http://localhost:${server.address().port}`);
})