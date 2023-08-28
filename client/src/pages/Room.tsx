import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ConnectedUsers from "../components/ConnectedUsers";
import { connectSocket } from "../libs/socket";
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import { javascript } from '@codemirror/lang-javascript';
import toast from 'react-hot-toast';

interface RoomProps { };

interface Client {
    username: string;
    socketId: string;
};

interface SocketParams {
    socketId: string;
    clients: Client[];
    username: string;
};

const Room = (props: RoomProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { roomId } = useParams();
    const username = location.state.username;
    if (!username) navigate('/');

    const [clients, setClients] = useState<Client[]>([]);
    const [code, setCode] = useState<string | undefined>('');
    const codeRef = useRef<string | null>(null);
    const socketRef = useRef<any>(null);

    function handleErrors(err: any) {
        toast.error('server error');
        console.error(err);
        navigate('/');
        navigate(0);
    }

    useEffect(() => {
        socketRef.current = connectSocket();
        const socket = socketRef.current;

        socket.on('connect_error', (err: any) => handleErrors(err));
        socket.on('connect_failed', (err: any) => handleErrors(err));

        // join the room when the component mounts
        socket.emit('join-room', { roomId, username });

        // listen for someone joining the room
        socket.on('room-joined', ({ clients, username: joinedUser, socketId }: SocketParams) => {
            if (joinedUser !== username) {
                toast.success(`${joinedUser} has joined the room`);
            }
            setClients(clients);
            toast.success(`You have joined the room`);
            socket.emit("sync-code", { socketId, code: codeRef.current });
        })

        // listen for someone leaving the room
        socket.on('user-disconnected', ({ username, socketId }: SocketParams) => {
            setClients((prevClients) => prevClients.filter((client) => client.socketId !== socketId));
            toast.error(`${username} has left the room`);
        });

        // listen for code changes
        socket.on('code-change', (updatedCode: string) => {
            if (updatedCode !== null) setCode(updatedCode);
        });

        return () => {
            socket.off('user-disconnected');
            socket.off('room-joined');
            socket.off('code-change');
            socket.disconnect();
        };
    }, [roomId, socketRef]);

    function copyHandler() {
        navigator.clipboard.writeText(roomId as string);
        toast.success('Room ID copied to clipboard');
        return;
    };

    function leaveHandler() {
        const socket = socketRef.current;

        socket.emit('leave-room', { roomId, username });
        socket.disconnect();
        navigate('/');
        navigate(0);
    };

    function handleCodeChange(value: string) {
        const socket = socketRef.current;

        setCode(value);
        codeRef.current = value;
        socket.emit('code-change', value);
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{username} | LiveSyntax</title>
                <meta name="description" content="LiveSyntax Room" />
            </Helmet>
            <div className='flex h-screen'>
                <div className='flex flex-col w-[20%] bg-gray-900 text-white text-center'>
                    <div className='p-5 text-center text-2xl font-medium bg-gradient-to-b from-burgundy to-gray-900'>LiveSyntax</div>
                    <div className='p-5'>
                        <div className='text-lg font-medium'>Room ID:</div>
                        <pre className='mt-2 bg-gray-800 p-2 rounded-md text-white'>{roomId}</pre>
                    </div>
                    <div className='p-5'>
                        <div className='text-lg font-medium'>Username: {username}</div>
                    </div>
                    <div className='p-5'>
                        <div className='text-lg font-medium'>Connected Users:</div>
                        <div className='mt-2 flex flex-col space-y-2 overflow-y-auto max-h-72 bg-gray-800 rounded-md p-4'>
                            <div>
                                {clients.map((client) => (
                                    <ConnectedUsers key={client.socketId} client={client} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex-grow'></div>
                    <div className='p-5 flex flex-col space-y-2'>
                        <button className='p-2 rounded-md bg-green-500 hover:bg-green-600 transition duration-300' onClick={copyHandler}>Copy Room ID</button>
                        <button className='p-2 rounded-md bg-red-500 hover:bg-red-700 transition duration-300' onClick={leaveHandler}>Leave Room</button>
                    </div>
                </div>


                <div className='w-[80%] bg-cement'>
                    <CodeMirror
                        value={code}
                        onChange={handleCodeChange}
                        style={{ color: 'black' }}
                        extensions={[javascript()]}
                        theme={tokyoNightStorm}
                        height="100vh"
                    />
                </div>
            </div>
        </>
    )
}

export default Room;
