import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/users.router.js"

const app = express()
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