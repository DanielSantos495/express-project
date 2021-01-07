const express = require('express');
      app = express();

app.get('/', (req, res, next) => {
   res.send({
      firstName: 'Daniel',
      lastName: 'Santos',
      age: 25,
      career: 'Frontent Dev'
   })
});

app.listen(8000, () => {
   console.log('Listening htt//localhost:8000', ' Reto OK');
})