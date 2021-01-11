const boom = require('boom');
const Sentry = require('@sentry/node');
const { config } = require('../../config');
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

// Sentry for error logs
Sentry.init({
   dsn: `https://${config.sentryDns}@o502842.ingest.sentry.io/${config.sentryId}`,

   tracesSampleRate: 1.0,
});

// Helper para asignar el stack al err boom
function withErrorStack(err, stack) {
   if (config.dev) {
      return {...err, stack};
   }
}


// Usando el next el primera middleware va pasando al segundo y así
function logError(err, req, res, next) {
   Sentry.captureException(err);
   console.error(err.stack);
   next(err);
}

// After middlerware the errors are boom
function wrapErrors(err, req, res, next) {
   if (!err.isBoom) {
      next(boom.badImplementation(err));
   }

   next(err);
}

function clientErrorHandler(err, req, res, next) {
   const {
      output: { statusCode, payload }
   } = err;
   // Catch errors for AJAX request or if an error ocurrs while straming
   // res.headersSent para capturar errores en archivos de tipo string, porque express no los reconoce
   if (isRequestAjaxOrApi(req) || res.headersSent) {
      res.status(statusCode).json(withErrorStack(payload, err.stack));
   } else {
      next(err);
   }
}

function errorHandler(err, req, res, next) {
   const {
      output: { statusCode, payload }
   } = err;

   res.status(statusCode);
   /* De esta manera renderizamos con el template engine, una vez este config, express lo tome por defecto, teniendo el cuenta los mismo nombres en los views */
   res.render('error', withErrorStack(payload, err.stack));
}

module.exports = {
   logError,
   wrapErrors,
   clientErrorHandler,
   errorHandler
};

