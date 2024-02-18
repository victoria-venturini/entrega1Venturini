import { Router } from "express"
import cartModel from "../../daos/model/cart.model.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        let carts = await cartModel.find()
        res.send({ result: "success", payload: carts })
    } catch (error) {

    }
})

router.post("/", async (req, res) => {
    let { nombre, categoria, precio } = req.body

    if (!nombre || !categoria || !precio) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await cartModel.create({ nombre, categoria, precio })
    res.send({ result: "success", payload: result })
})


router.put("/:uid", async (req, res) => {
    let { uid } = req.params
    let cartToReplace = req.body
    if (!cartToReplace.nombre || !cartToReplace.categoria || !cartToReplace.precio) {
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

export default router