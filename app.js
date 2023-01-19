const http = require('http');
const express = require('express');
const app = express();

const handle_connection = require('./server.js');

process.setMaxListeners(0);

const server = http.createServer(app);

//API
app.get('/', function (req, res) {
  res.json('server running!!');
});

const io = require('socket.io')(server, {
  cors: true,
});

io.on('connection', (sockets) => handle_connection(sockets, io));

server.listen(3000);

app.use('/static', express.static('node_modules'));