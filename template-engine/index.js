const express = require('express');
      app = express();
      expressJS = require('./express-jsx.js');


// esto no soporta jsx, solo es un ejemplo
app.engine('jsx', expressJS);
app.set('views', './views');
app.set('view engine', 'jsx');

app.get('/', (req, res, next) => {
   res.render('index', { hello: 'Hola', world: 'mundo!'} );
});

const server = app.listen(8000, () => {
   console.log(`Listening http://localhost:${server.address().port}`)
})