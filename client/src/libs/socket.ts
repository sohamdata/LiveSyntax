import { io } from 'socket.io-client';

const OPTIONS = {
    reconnectionAttempts: 5,
    timeout: 10000,
    transports: ['websocket'],
};

// process.env.REACT_APP_BACKEND_URL for cra
// const SERVER = import.meta.env.DEV ? import.meta.env.VITE_LOCAL_BACKEND_URL : import.meta.env.VITE_LIVE_SERVER_URL;
const SERVER = import.meta.env.DEV ? 'http://localhost:5000' : 'https://livesyntax-server.glitch.me/';

export const connectSocket = () => {
    return io(SERVER, OPTIONS);
};
