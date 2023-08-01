import { io } from 'socket.io-client';

const options = {
    'force new connection': true,
    reconnectionAttempts: 5,
    timeout: 10000,
    transports: ['websocket'],
};

// process.env.REACT_APP_BACKEND_URL
const SERVER = import.meta.env.VITE_BACKEND_URL;

export const socket = io(SERVER, options);
