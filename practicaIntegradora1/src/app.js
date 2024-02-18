import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/users.router.js"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
import messageRouter from "./routes/messages.router.js"
import handlebars from "express-handlebars"


const app = express()

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");



const PORT = 8080


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(express.json())

mongoose.connect("mongodb+srv://vventurini:16371@clustercoder.szloyof.mongodb.net/coderDB?retryWrites=true&w=majority")
    .then(() => {
        console.log("Conectado a la base de datos")
    })
    .catch(error => {
        console.error("Error al conectarse a la base de datos", error)
    })

    
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/api/messages", messageRouter)

app.get("/", (req, res) => res.render("./layouts/main"));
app.get("/api/products", (req, res) =>
  res.render("./views/products"));
  