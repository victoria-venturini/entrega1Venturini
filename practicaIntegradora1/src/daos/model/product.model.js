import mongoose from "mongoose";

const productCollection = "products"

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true, max: 100 },
    categoria: { type: String, required: true, max: 100 },
    precio: { type: String, required: true, max: 50 }
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel 