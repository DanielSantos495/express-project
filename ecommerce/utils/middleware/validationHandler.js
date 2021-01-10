function validate(data, schema) {
   return false;
}

function validationHandler(schema, check = 'body') {
   return (req, res, next) => {
      const error = validate(req[check], schema);
      error ? new Error(error) : next();
   }
}

module.exports = validationHandler;