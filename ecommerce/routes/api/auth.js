const express = require('express');
const passport = require('passport');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const { config } = require('../../config');
const router = express.Router();


// Basic strategy
require('../../utils/auth/strategies/basic');

router.post('/token', async (req, res, next) => {
   passport.authenticate('basic', (error, user) => {
      try {
         if (error || !user) {
            next(boom.unauthorized());
         }

         req.login(user, { session: false }, async (err) => {
            if (err) {
               next(err);
            }
            const payload = { sub: user.username, email: user.email };
            const token = jwt.sign(payload, config.authJwtSecret, {
               // Tiempo de expiración del token
                expiresIn: '15m'
            });
            return res.status(200).json({ access_token: token });
         });
      } catch(error) {
         next(error);
      }
   })(req, res, next)
});

module.exports = router;