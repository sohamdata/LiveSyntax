import { useState } from "react";
import { nanoid } from 'nanoid';
import { useRouter } from "next/router";

interface JoinRoomProps { };

const JoinRoom = (props: JoinRoomProps) => {
    const router = useRouter();
    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const [isGenerated, setIsGenerated] = useState(false);

    const generateRoomId = () => {
        setRoomId(nanoid());
        setIsGenerated(true);
    };

    const joinAnotherRoom = () => {
        setRoomId('');
        setIsGenerated(false);
    };

    const joinHandler = (e: any) => {
        e.preventDefault();
        if (!roomId || !username) {
            alert('Please fill in the required fields');
            return;
        }
        router.push({
            pathname: `/editor/${roomId}`,
            query: { username: username, }
        }, `/editor/${roomId}`,
        );
    };

    return (
        <>
            <div className='w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center'>
                <div className='rounded-md relative w-full bg-burgundy'>
                    <div className='w-full h-full flex justify-center'>
                        <form className="space-y-4 px-4 p-4 w-[400px]">
                            <h1 className="text-center text-2xl text-white font-medium">LiveSyntax</h1>
                            <div>
                                <label htmlFor="roomid" className="my-2 block text-white">Room ID</label>
                                <input type="roomid" id="roomid" placeholder="paste room id here"
                                    className={`p-1.5 rounded-md outline-none w-full text-black text-sm placeholder-gray-400 ${isGenerated && 'font-bold'}`}
                                    value={roomId}
                                    {...isGenerated && { readOnly: true }}
                                    onChange={(e) => setRoomId(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="username" className="my-2 block text-white">Username</label>
                                <input type="username" id="username" placeholder="something cool"
                                    className="mb-4 p-1.5 rounded-md outline-none w-full text-black text-sm"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <button type="submit" onClick={joinHandler}
                                className="py-2 w-full rounded-md font-medium text-white bg-blue-700 hover:bg-blue-800 transition duration-300"
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
                </div>
            </div>
        </>
    );
};

export default JoinRoom;
