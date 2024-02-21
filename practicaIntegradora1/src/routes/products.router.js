import { Router } from "express"
import productModel from "../daos/model/product.model.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        let products = await productModel.find()
        res.send({ result: "success", payload: products })
    } catch (error) {

    }
    
})

router.post("/", async (req, res) => {
    let { nombre, categoria, precio } = req.body

    if (!nombre || !categoria || !precio) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await productModel.create({ nombre, categoria, precio })
    res.send({ result: "success", payload: result })
})


router.put("/:uid", async (req, res) => {
    let { uid } = req.params
    let productToReplace = req.body
    if (!productToReplace.nombre || !productToReplace.categoria || !productToReplace.precio) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await productModel.updateOne({ _id: uid }, productToReplace)
    res.send({ result: "success", payload: result })
})


router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await productModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})

export default router