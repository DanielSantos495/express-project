const express = require('express');
      app = express();

app.get('/', (req, res, next) => {
   res.send('Hello world');
});

const server = app.listen(8000, () => {
   // app.listen nos devuelve un objeto y podemos usarlo así.
   console.log(`Listening http://localhost:${server.address().port}`)
});