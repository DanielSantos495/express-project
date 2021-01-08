const fs = require('fs');

function getKeysFromOptions(options) {
   /* Así sacamos propiedades de un objeto con destructuring, el objectKeys es la variable
   donde quedan las demás propiedades y las que vamos a usar */
   const { settings, _locals, ...objectKeys } = options;
   return Object.keys(objectKeys);
}

function getRenderedContent(template, data) {
   const keys = getKeysFromOptions(data);
   let contentString = template.toString();

   for (let key of keys) {
      contentString = contentString.replace(
         new RegExp(`\{${key}\}`, "gi"),
         data[key]
      );
   }
   return contentString;
}

function expressJS(filePath, options, callback) {
   // 'fs' para poder leer el archivo desde node
   fs.readFile(filePath, (err, content) => {
      if (err) {
         return callback(err);
      }
      // En esta función mezclamos en template con la data y la retornamos
      const rendered = getRenderedContent(content, options)

      return callback(null, rendered);
   })
}

module.exports = expressJS;