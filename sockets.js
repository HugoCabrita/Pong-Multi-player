let readyPlayerCount = 0;


function listen(io) {
  const pongNameSpace = io.of('/pong');
  pongNameSpace.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    let room;
    socket.on('ready', () => {
      room ='room' + Math.floor(readyPlayerCount/2);
      socket.join(room);

      console.log('Player ready', socket.id);
      readyPlayerCount++;

      if(readyPlayerCount % 2=== 0 ) {
        // send to every on in the room
        pongNameSpace.in(room).emit('startGame', socket-id);
      }
    });
    socket.on('paddleMove',(paddleData) => {
      socket.to(room).emit('paddleMove', paddleData); //to every one in a room except sender
      //socket.broadcast.emit('paddleMove', paddleData); // every one connected except sender
    });

    socket.on('ballMove', (ballData) => {
      socket.to(room).emit('ballMove', ballData);
    });

    socket.on('disconnect', (reason) => {
      console.log(`Client ${socket.id} disconnected: ${reason}.`);
      // socket io automactic leaves a room when desconnected
      socket.leave(room);
    });
});
}

module.exports = {
  listen,
}