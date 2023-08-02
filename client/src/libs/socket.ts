import { io } from 'socket.io-client';

const OPTIONS = {
    reconnectionAttempts: 5,
    timeout: 10000,
    transports: ['websocket'],
};

// process.env.REACT_APP_BACKEND_URL
const SERVER = import.meta.env.VITE_BACKEND_URL;

export const connectSocket = () => {
    return io(SERVER, OPTIONS);
};
