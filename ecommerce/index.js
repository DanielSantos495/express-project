const express = require('express');
      path = require('path');
      productsRouter = require('./routes/views/products');
      productsApiRouter = require('./routes/api/products');
      const { logError, clientErrorHandler, errorHandler } = require('./utils/middleware/errorsHandlers');
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
});

// Error handler
app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
const server = app.listen(8000, () => {
   console.log(`Listening http://localhost:${server.address().port}`);
});