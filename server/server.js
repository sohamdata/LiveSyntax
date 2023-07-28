const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5000;

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('a user CONNECTED', socket.id);

    socket.on('join', ({ roomid, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomid);
    });
});

server.listen(PORT, () => { console.log(`> listening on port ${PORT}`); });
