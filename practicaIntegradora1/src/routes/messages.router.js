import { Router } from "express"
import messageModel from "../daos/model/message.model.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        let messages = await messageModel.find()
        res.send({ result: "success", payload: messages })
    } catch (error) {

    }
})

router.post("/", async (req, res) => {
    let { mensaje, usuario} = req.body

    if (!mensaje || !usuario) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await messageModel.create({ mensaje, usuario})
    res.send({ result: "success", payload: result })
})

router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await messageModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})

export default router