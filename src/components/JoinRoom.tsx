interface JoinRoomProps { }

const JoinRoom = (props: JoinRoomProps) => {
    return (
        <>
            <div className='w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center'>
                <div className='rounded-lg shadow relative w-full bg-teal-500'>
                    <div className='w-full h-full flex  justify-center'>
                        <form className="space-y-4 px-4 p-4">
                            <h1 className="text-center text-2xl text-white font-medium">LiveSyntax</h1>
                            <div>
                                <label htmlFor="email" className="my-2 block text-white">Room ID</label>
                                <input type="email" name="email" id="email"
                                    className="p-1.5 rounded-md outline-none border-5 w-full text-black text-sm placeholder-gray-400"
                                />
                            </div>
                            <div>
                                <label htmlFor="username" className="my-2 block text-white">Username</label>
                                <input type="password" name="password" id="password"
                                    className="mb-4 p-1.5 rounded-md outline-none border-5 w-full text-black text-sm"
                                />
                            </div>
                            <button type="submit" className="py-2 w-full rounded-md font-medium text-white bg-blue-600 hover:bg-blue-800 hover:text-brand-orange transition duration-300">
                                Join Room
                            </button>
                            <div>
                                <p className="text-center text-white">
                                    Don't have a room?
                                    <a className="ml-2 text-blue-600 cursor-pointer hover:underline">
                                        New Room
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JoinRoom;
