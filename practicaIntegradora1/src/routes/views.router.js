import express from 'express';

const router = express.Router()


router.get("/", (req, res) => res.render("users"));

router.get("/products", (req, res) =>
  res.render("products"));

  router.get('/users', (req, res) => {
    res.render('users')
  })

  router.get('/messages', (req, res) => {
    res.render('messages')
  })
  router.get('/carts', (req, res) => {
    res.render('carts')
  })

export default router;