import { Router } from "express"
import userModel from "../daos/model/user.model.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        let users = await userModel.find()
        res.send({ result: "success", payload: users })
    } catch (error) {

    }
})

router.post("/", async (req, res) => {
    let { first_name, last_name, email, gender } = req.body

    if ( !first_name || !last_name || !email || !gender) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await userModel.create({ first_name, last_name, email, gender })
    res.send({ result: "success", payload: result })
})


router.put("/:uid", async (req, res) => {
    let { uid } = req.params
    let userToReplace = req.body
    if (!userToReplace.nombre || !userToReplace.apellido || !userToReplace.email) {
        res.send({ status: "error", error: "Faltan datos" })
    }

    let result = await userModel.updateOne({ _id: uid }, userToReplace)
    res.send({ result: "success", payload: result })
})


router.delete("/:uid", async (req, res) => {
    let { uid } = req.params
    let result = await userModel.deleteOne({ _id: uid })
    res.send({ result: "success", payload: result })
})







export default router