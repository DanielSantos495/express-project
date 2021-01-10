const Sentry = require('@sentry/node');
const { config } = require('../../config');

// Sentry for error logs
Sentry.init({
   dsn: `https://${config.sentryDns}@o502842.ingest.sentry.io/${config.sentryId}`,

   tracesSampleRate: 1.0,
 });

// Usando el next el primera middleware va pasando al segundo y así
function logError(err, req, res, next) {
   Sentry.captureException(err);
   console.error(err.stack);
   next(err);
}

function clientErrorHandler(err, req, res, next) {
   // Catch errors for AJAX request
   if (req.xhr) {
      res.status(500).json({ error: err.message });
   } else {
      next(err);
   }
}

function errorHandler(err, req, res, next) {
   // catch errors while streaming
   // res.headersSent para capturar errores en archivos de tipo string, porque express no los reconoce
   if (res.headersSent) {
      // Como no hay más middleware, aquí llamamos al manjeador de errores nativo de express
      next(err);
   }

   // Si el entorno es en desarrollo, eliminamos el stack del err de middleware
   if (!config.dev) {
      delete err.stack;
   }

   res.status(err.status || 500);
   /* De esta manera renderizamos con el template engine, una vez este config, express lo tome por defecto, teniendo el cuenta los mismo nombres en los views */
   res.render('error', { err });
}

module.exports = {
   logError,
   clientErrorHandler,
   errorHandler
};

