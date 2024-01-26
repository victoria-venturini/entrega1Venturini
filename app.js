const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');

const app = express();
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => console.log('Server listening on port 8080'));