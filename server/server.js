const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(cors());
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

io.on('connection', (socket) => {
    console.log('a user CONNECTED with socketId', socket.id);

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
        console.log('a user LEFT with socketId', socket.id);
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit('user-disconnected', { username: userSocketMap[socket.id], socketId: socket.id });
        });
        delete userSocketMap[socket.id];
        socket.leave();
        console.log('a user DISCONNECTED with socketId', socket.id);
    });

    socket.on('code-change', (updatedCode) => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit('code-change', updatedCode);
        });
    });

    socket.on("sync-code", ({ socketId, code }) => {
        io.to(socketId).emit("code-change", code);
    });
});

server.listen(PORT, () => { console.log(`> listening on port ${PORT}`); });
