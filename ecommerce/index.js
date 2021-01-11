const express = require('express');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');
const boom = require('boom');
const path = require('path');
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');
const { logError, wrapErrors, clientErrorHandler, errorHandler } = require('./utils/middleware/errorsHandlers');
// app
const app = express();


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
// Patrón de inversión de control
productsApiRouter(app);
app.use('/api/auth', authApiRouter);

// Redirect
app.get('/', (req, res) => {
   res.redirect('products')
});

// error 404
app.use((req, res, next) => {
   // validamos si ajax o api de la api para enviar un json
   if (isRequestAjaxOrApi(req)) {
      const {
         output: { statusCode, payload }
      } = boom.notFound();

      res.status(statusCode).json(payload);
   }
// sino enviamos la página 404, si es del cliente
   res.status(404).render('404');
})

// Error handler
app.use(logError);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// Server
const server = app.listen(8000, () => {
   console.log(`Listening http://localhost:${server.address().port}`);
});