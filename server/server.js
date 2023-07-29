const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
const PORT = process.env.PORT || 5000;

const userSocketMap = {};

const getRoomClients = (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    const clients = [...room];
    return clients.map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId],
        };
    });
};

io.on('connection', (socket) => {
    console.log('a user CONNECTED to socketId', socket.id);

    socket.on('join-room', ({ roomId, username }) => {
        userSocketMap[socket.id] = username;
        socket.join(roomId);

        const clients = getRoomClients(roomId);

        // send to all clients in the room
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit('room-joined', { clients, username, socketId: socket.id });
        })

    });
});

server.listen(PORT, () => { console.log(`> listening on port ${PORT}`); });
