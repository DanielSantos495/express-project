const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('boom');
const bcrypt = require('bcrypt');
const MongoLib = require('../../../lib/monog');

passport.use(
   // Para manejar auth basic, username y password se reciben automáticamente desde el request
   new BasicStrategy(async (username, password, cb) => {
      const mongoDB = new MongoLib();

      try {
         // obtenemos el usuario
         const [user] = await mongoDB.getAll('users', { username });

         // Validamos si es el usuario o no
         if(!user) {
            return cb(boom.unauthorized(), false)
         }

         // Validamos si la contraseña es la correcta
         if(!await bcrypt.compare(password, user.password)) {
            return cb(boom.unauthorized(), false);
         }

         /* Devolvemos user si todo es OK! En Node si no hay error para un callback enviamos null
         como primera parámetro después lo que vamos a devolver porque node es ErroFirstCallback*/
         return cb(null, user);

      } catch(err) {
         return cb(err);
      }
   })
);