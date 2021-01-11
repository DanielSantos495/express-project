const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('boom');
const { config } = require('../../../config');
const MongoLib = require('../../../lib/monog');

passport.use(
   new Strategy({
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
   },
      async (tokenPayload, cb) => {
         const mongoDB = new MongoLib();
         try {
            const [user] = await mongoDB.getAll('users', {
               username: tokenPayload.sub
            });

            if (!user) {
               return cb(boom.unauthorized(), false);
            }

            return cb(null, user);
         } catch(err) {
            cb(err);
         }
      }
   )
);