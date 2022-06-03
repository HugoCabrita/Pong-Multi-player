const http = require('http');
const io =require('socket.io')

const apiServer = require('./api.js');
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer, {/*
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }*/
});

const socket = require('./sockets.js');

const PORT = 3000;
httpServer.listen(PORT);
console.log(`Listening on port ${PORT}...`);

socket.listen(socketServer);



