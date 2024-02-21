import mongoose from "mongoose";

const messageCollection = "messages"

const messageSchema = new mongoose.Schema({
    mensaje: { type: String, required: true, max: 100 },
    usuario: { type: String, required: true, max: 100 },
})

const messageModel = mongoose.model(messageCollection, messageSchema)

export default messageModel