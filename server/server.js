const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
    console.log('a user CONNECTED');
    console.log(socket.id);
});

server.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
