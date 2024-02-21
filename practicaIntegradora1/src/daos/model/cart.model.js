import mongoose from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 100 },
    categoria: { type: String, required: true, max: 100 },
    precio: { type: String, required: true, max: 50 }
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export default cartModel