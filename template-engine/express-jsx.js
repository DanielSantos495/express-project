const fs = require('fs');

function getRenderedContent(template, data) {
   
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