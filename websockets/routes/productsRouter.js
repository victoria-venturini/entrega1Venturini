import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
// import ProductManager from './productManager.js';
// const productManager = new ProductManager('./products.json'); 
const productsRouter = express.Router();
const products = []

productsRouter.get('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync('products.json'));
  res.json(products);
});
productsRouter.get('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync('products.json'));
  const product = products.find(p => p.id === req.params.pid);
  res.json(product);
});
productsRouter.post('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync('products.json'));
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  fs.writeFileSync('products.json', JSON.stringify(products));
  res.json(newProduct);
});



productsRouter.put('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync('products.json'));
  const productIndex = products.findIndex(p => p.id === req.params.pid);
  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    fs.writeFileSync('products.json', JSON.stringify(products));
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});
productsRouter.delete('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync('products.json'));
  const productIndex = products.findIndex(p => p.id === req.params.pid);
  if (productIndex !== -1) {
    const deletedProduct = products.splice(productIndex, 1);
    fs.writeFileSync('products.json', JSON.stringify(products));
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

export default productsRouter;