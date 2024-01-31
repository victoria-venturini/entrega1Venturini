const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Acepta 'io' como un parámetro
const setupSocketIO = (io) => {
  router.use(bodyParser.urlencoded({ extended: true }));

  router.get('/', (req, res) => {
    res.render('../views/layouts/main.handlebars', { products: [] });
  });

  router.post('/', (req, res) => {
    const product = req.body.product;

    // Usa 'io' aquí para emitir el evento a todos los clientes
    io.emit('product', product);

    res.redirect('/');
  });

  return router;
};

// Exporta la función setupSocketIO para usarla en app.js
module.exports = setupSocketIO;