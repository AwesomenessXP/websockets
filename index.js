// make the new server for our app
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// define route handler '/' that's called when we hit home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); 
});

// make http server listen on port 3000
server.listen(3000, () => {
  console.log('listening on *:3000');
})