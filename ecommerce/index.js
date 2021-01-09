const express = require('express');
      path = require('path');
      productsRouter = require('./routes/views/products');
      productsApiRouter = require('./routes/api/products');
      // app
      app = express();

// Middlewares
app.use(express.json());

// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// json parser

// View engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

// Routes
app.use('/products', productsRouter);
app.use('/api/products', productsApiRouter);

// Redirect
app.get('/', (req, res) => {
   res.redirect('products')
})

// Server
const server = app.listen(8000, () => {
   console.log(`Listening http://localhost:${server.address().port}`);
});