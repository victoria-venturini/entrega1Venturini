const express = require('express');
const handlebars = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const setupSocketIO = require('./routes/viewsRouter.js');

const app = express();
const PORT = 8080;
const server = http.createServer(app);
const io = new Server(server);

app.engine("handlebars", handlebars.engine())
app.set('view engine', 'handlebars');

// Configurar eventos de conexión en Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');

  // Manejar eventos personalizados, por ejemplo 'product'
  socket.on('product', (data) => {
    console.log('Received product:', data);

    // Emitir el evento 'product' a todos los clientes conectados
    io.emit('renderProduct', data);
  });

  // Manejar eventos de desconexión
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Configurar las rutas y pasar 'io' a setupSocketIO
app.use('/', setupSocketIO(io));

// Escuchar el evento 'renderProduct' y actualizar el HTML en el cliente
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});
app.get('/socket.io/socket.io.js.map', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js.map');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});