const express = require("express");
const socketIO = require("socket.io");
const handlebars = require("express-handlebars");

const app = express();
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

const server = require("http").createServer(app);
const io = socketIO(server);

let products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
]; 

io.on("connection", (socket) => {
  console.log("a user connected");

  // Enviar la lista de productos a la vista en tiempo real
  socket.emit("products", products);

  // Manejar la creación de un producto
  socket.on("createProduct", (product) => {
    console.log("createProduct", product);
    products.push(product);
    io.emit("products", products); // Actualizar la lista de productos para todos los clientes
  });

  // Manejar la eliminación de un producto
  socket.on("deleteProduct", (productId) => {
    products = products.filter((product) => product.id !== productId);
    io.emit("products", products); // Actualizar la lista de productos para todos los clientes
  });
});

// Rutas de Express para renderizar las vistas
app.get("/", (req, res) => res.render("./layouts/main", { products }));
app.get("/realtimeproducts", (req, res) =>
  res.render("./layouts/realTimeProducts", { products })
);

server.listen(3000, () => console.log("listening on *:3000"));