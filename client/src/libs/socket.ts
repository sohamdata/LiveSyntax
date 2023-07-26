import { io } from 'socket.io-client';

export const socket = async () => {
    return io(process.env.NEXT_PUBLIC_BACKEND_URL as string, { transports: ['websocket'] });
};
