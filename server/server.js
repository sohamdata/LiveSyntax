const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
const PORT = process.env.PORT || 5000;

const userSocketMap = {};

function getRoomClients(roomId) {
    const room = io.sockets.adapter.rooms.get(roomId);
    const clients = [...room];
    return clients.map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId],
        };
    });
};

function getSocketRoom(socket) {
    const rooms = [...socket.rooms];
    return rooms.find((room) => room !== socket.id);
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

    socket.on('leave-room', ({ roomId, username }) => {
        socket.to(roomId).emit('user-disconnected', { username, socketId: socket.id });
        delete userSocketMap[socket.id];
        socket.leave(roomId);
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit('user-disconnected', { username: userSocketMap[socket.id], socketId: socket.id });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });

    socket.on('code-change', (updatedCode) => {
        const room = getSocketRoom(socket);
        socket.to(room).emit('code-change', updatedCode);
    });
});

server.listen(PORT, () => { console.log(`> listening on port ${PORT}`); });
