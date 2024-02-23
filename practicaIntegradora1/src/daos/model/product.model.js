import mongoose from "mongoose";

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 50 },
    price: {type: String, required: true, max: 10},
    status: {type: String, required: true, max: 50}, 
    stock: {type: String, required: true, max: 10},
    category: {type: String, required: true, max: 50}, 
    thumbnail: {type: String, required: true, max: 50}, 
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel 