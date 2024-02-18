import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const cartsRouter = express.Router();

cartsRouter.post('/', (req, res) => {
  const carts = JSON.parse(fs.readFileSync('carts.json'));
  const newCart = { id: uuidv4(), products: [] };
  carts.push(newCart);
  fs.writeFileSync('carts.json', JSON.stringify(carts));
  res.json(newCart);
});
cartsRouter.get('/:cid', (req, res) => {
  const carts = JSON.parse(fs.readFileSync('carts.json'));
  const cart = carts.find(c => c.id === req.params.cid);
  res.json(cart);
});
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  const carts = JSON.parse(fs.readFileSync('carts.json'));
  const cartIndex = carts.findIndex(c => c.id === req.params.cid);
  if (cartIndex !== -1) {
    const productIndex = carts[cartIndex].products.findIndex(p => p.product === req.params.pid);
    if (productIndex !== -1) {
      carts[cartIndex].products[productIndex].quantity += 1;
    } else {
      carts[cartIndex].products.push({ product: req.params.pid, quantity: 1 });
    }
    fs.writeFileSync('carts.json', JSON.stringify(carts));
    res.json(carts[cartIndex]);
  } else {
    res.status(404).json({ error: 'Cart not found' });
  }
});

export default cartsRouter;