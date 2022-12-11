// make the new server for our app
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// make http server listen on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
});

// define route handler '/' that's called when we hit home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});

io.on('connection', (socket) => {
  console.log('a user connected!!!');
  socket.on('disconnect', () => {
    console.log('user disconnected :(');
  });
});

io.on('connection', (socket) => {
  socket.on('chat msg', (msg) => {
    console.log('message: ' + msg);
  });
});

// broadcasts to everybody but the sender (yourself)
// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi');
// });

// broadcast to everyone including yourself
io.on('connection', (socket) => {
  socket.on('chat msg', (msg) => {
    io.emit('chat msg', msg);
  });
});
