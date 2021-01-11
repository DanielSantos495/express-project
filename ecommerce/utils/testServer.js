const express = require('express');
const supertest = require('supertest');

function testServer(route) {
   const app = express();
   // Le vamos a pasar al app a la ruta que volvimo en inversión de control y exportamos la funct
   route(app);

   return supertest(app);
}

module.exports = testServer;