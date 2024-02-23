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
    let { title, description,code,price,status,stock,category,thumbnail } = req.body

    if (!title|| !description || !code || !price ||!status || !stock || !category ||!thumbnail) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await productModel.create({ title, description, code, price, status, stock, category, thumbnail })
    res.send({ result: "success", payload: result })
})


router.put("/:uid", async (req, res) => {
    let { uid } = req.params
    let productToReplace = req.body
    if (!productToReplace.title || !productToReplace.description || !productToReplace.code || !productToReplace.price || !productToReplace.status || !productToReplace.stock || !productToReplace.category || !productToReplace.thumbnail) {
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