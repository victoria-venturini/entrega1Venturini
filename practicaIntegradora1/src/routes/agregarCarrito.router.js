import express from 'express';
import cartModel from "../daos/model/cart.model.js"

const router = express.Router()

router.get("/", (req, res) =>
  res.render("carts"));


  router.post("/", async (req, res) => {
    let { products, id, quantity } = req.body

    if (!products || !id || !quantity) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await cartModel.create({ products, id, quantity })
    res.send({ result: "success", payload: result })
})


router.put("/:uid", async (req, res) => {
    let { uid } = req.params
    let cartToReplace = req.body
    if (!cartToReplace.products || !cartToReplace.id || !cartToReplace.quantity) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await cartModel.updateOne({ _id: uid }, cartToReplace)
    res.send({ result: "success", payload: result })
})


router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await cartModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})

  export default router;