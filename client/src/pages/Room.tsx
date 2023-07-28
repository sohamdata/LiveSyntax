import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams, } from 'react-router-dom';
import ConnectedUsers from "../components/ConnectedUsers";
import TextEditor from "../components/TextEditor";
import { socket } from "../libs/socket";

interface RoomProps { };

const Room = (props: RoomProps) => {
    const location = useLocation();
    const reactNavigator = useNavigate();
    const { roomid } = useParams();
    const username = location.state?.username

    const socketRef = useRef<any>(null);

    function handleErrors(err: any) {
        console.log(err);
        reactNavigator('/');
    }

    useEffect(() => {
        const innit = async () => {

            socketRef.current = await socket();
            socketRef.current.on('connect_error', (err: any) => handleErrors(err));
            socketRef.current.on('connect_failed', (err: any) => handleErrors(err));

            socketRef.current.emit('join', { roomid, username });
        };

        innit();
    }, []);

    const [clients, setClients] = useState([
        { socketId: 1, name: 'soham' },
        { socketId: 2, name: 'anothersoham' },
    ]);

    const copyHandler = () => {
        navigator.clipboard.writeText(roomid as string);
        return;
    };

    const leaveHandler = () => {
        reactNavigator('/');
    };

    return (
        <div className='flex h-screen'>
            <div className='p-2 flex flex-col justify-between w-[20%] bg-burgundy'>
                <div className='flex flex-col items-center'>
                    <div>
                        <div className='text-white text-center text-2xl font-medium'>LiveSyntax</div>
                        <div className='text-white text-center text-lg font-medium'>Room ID: {roomid}</div>
                        <div className='text-white text-center text-lg font-medium'>username: {username}</div>
                    </div>
                    <div className='mt-4'>
                        <div className='text-white text-center text-lg font-medium'>Connected Users</div>
                        <div className='mt-2 flex flex-col space-y-2'>
                            {clients.map((client) => (
                                <ConnectedUsers key={client.socketId} client={client} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='mb-2 flex items-center justify-center space-x-5'>
                    <button className='p-2 rounded-sm bg-green-500 hover:bg-green-800 transition duration-300' onClick={copyHandler}>Copy Room ID</button>
                    <button className='p-2 rounded-sm bg-red-500 hover:bg-red-800 transition duration-300' onClick={leaveHandler}>Leave Room</button>
                </div>
            </div>
            <div className='w-[80%] bg-cement'>
                <TextEditor />
            </div>
        </div>
    )
}

export default Room;
