import { io } from 'socket.io-client';

export const socket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempts: 5,
        timeout: 10000,
        transports: ['websocket'],
    };

    return io(process.env.NEXT_PUBLIC_BACKEND_URL as string, options);
};
