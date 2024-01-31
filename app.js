import express from 'express';
import path from 'path'
import { v4 as uuidv4 } from 'uuid';
import handlebars from 'express-handlebars'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import productsRouter from "./routes/productsRouter.js";
// import ProductManager from './routes/productManager.js';
import cartsRouter from "./routes/cartsRouter.js";
import { Server } from "socket.io";
import viewsRouter from "./routes/viewsRouter.js"
import realTimeProductsRouter from "./routes/realTimeProductsRouter.js"
import fs from 'fs';
import http from 'http';


// const productManager = new ProductManager('./products.json'); 
// const cartsManager = new CartsManager('./carts.json'); 
const myUuid = uuidv4();
const app = express();
const PORT = 8080;
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '/public')))


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.use('/realTimeProducts', realTimeProductsRouter);

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + '/views')
app.set('view engine', "handlebars")




const httpServer = app.listen(8080, () => console.log('Server listening on port 8080'));

const socketServer = new Server(httpServer);
app.use("/", viewsRouter )
socketServer.on ('connection', socket=>{
    // console.log("nueva conexion");
    socket.on('mensaje', data=>{
        socket.emit("mensaje", data)
    })
})

// const socketServer2 = new Server(httpServer);
// app.use("/realTimeProducts", realTimeProductsRouter )
// socketServer.on ('connection', socket=>{
//     // console.log("nueva conexion");
//     socket.on('mensaje', data=>{
//         socket.emit("mensaje", data)
//     })
// })