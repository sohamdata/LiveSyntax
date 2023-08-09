import { useState } from "react";
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const JoinRoom = () => {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);
    const [isServerExpanded, setIsServerExpanded] = useState(false);


    const generateRoomId = () => {
        setRoomId(nanoid());
        setIsGenerated(true);
    };

    const joinAnotherRoom = () => {
        setRoomId('');
        setIsGenerated(false);
    };

    const joinHandler = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!roomId || !username) {
            toast.error('Please fill in the required fields');
            return;
        }

        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        });;
    };

    const startServer = () => {
        if (import.meta.env.PROD) {
            fetch('https://livesyntax-server.glitch.me/wakeup')
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        toast.success(data.message);
                    }
                }
                )
                .catch((err) => {
                    toast.error('Server is down');
                }
                );
        }
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='max-w-md w-full p-6 bg-burgundy rounded-lg shadow-md'>
                <h1 className="text-center text-3xl text-white font-semibold"> LiveSyntax</h1>
                <form className="space-y-5 p-4">
                    <div className="border-b-2 border-green-500" /> <div>
                        <label htmlFor="roomid" className="my-2 block text-white">Room ID</label>
                        <input type="roomid" id="roomid" placeholder="paste room id here"
                            className={`p-2 rounded-md outline-none w-full text-black text-sm placeholder-gray-400 ${isGenerated && 'font-bold'}`}
                            value={roomId}
                            {...isGenerated && { readOnly: true }}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="my-2 block text-white">Username</label>
                        <input type="username" id="username" placeholder="something cool"
                            className="p-2 rounded-md outline-none w-full text-black text-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <button type="submit" onClick={joinHandler}
                        className="py-2 w-full rounded-md font-medium text-white bg-slate-900 hover:bg-slate-800 transition duration-300"
                    >
                        Join Room
                    </button>
                    <div>
                        {!isGenerated && <p className="text-center text-white">
                            Don't have a room?
                            <span className="ml-2 text-blue-600 cursor-pointer hover:underline" onClick={generateRoomId}>
                                Create one
                            </span>
                        </p>}
                        {isGenerated && <p className="text-center text-white">
                            join another room?
                            <span className="ml-2 text-gray-400 cursor-pointer hover:underline" onClick={joinAnotherRoom}>
                                enter a room id
                            </span>
                        </p>
                        }
                    </div>
                </form>
            </div>
            <div className='flex flex-col justify-center items-center p-6 mt-4 max-w-md w-full bg-gray-800 rounded-lg shadow-md'>
                <button
                    onClick={() => setIsServerExpanded(!isServerExpanded)}
                    className='w-[300px] py-2 text-white bg-tesla-blue rounded-md hover:bg-tesla-red transition duration-300'
                >
                    Server Error?
                </button>
                {isServerExpanded && (
                    <div className='flex flex-col justify-center items-center'>
                        <button
                            className='mt-5 w-[300px] py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300'
                            onClick={startServer}
                        >
                            &gt; Wakeup Server
                        </button>
                        <p className='mt-5 text-teal-700'>
                            glitch.com puts the server to sleep after just 5 minutes of inactivity
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JoinRoom;
