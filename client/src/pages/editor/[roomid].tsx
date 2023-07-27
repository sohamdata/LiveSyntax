import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ConnectedUsers from "@/components/ConnectedUsers";
import TextEditor from "@/components/TextEditor";
import { socket } from "@/libs/socket";

interface RoomIDProps { };

const Editor = (props: RoomIDProps) => {
    const router = useRouter();
    console.log(router.query);
    const { roomid } = router.query;
    const [username, setUsername] = useState('');

    useEffect(() => {
        const sessionusername = sessionStorage.getItem('username');
        if (sessionusername) {
            setUsername(sessionusername);
        }
    }, [router.isReady]);

    const socketRef = useRef<any>(null);

    useEffect(() => {
        const innit = async () => {
            socketRef.current = await socket();
            socketRef.current.emit('join', { roomid, username });
        };
        innit();
    }, [roomid])

    const [clients, setClients] = useState([
        { socketId: 1, name: 'soham' },
        { socketId: 2, name: 'anothersoham' },
    ]);

    const copyHandler = () => {
        navigator.clipboard.writeText(roomid as string);
        return;
    };

    const leaveHandler = () => {
        router.push('/');
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

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { roomid: 'test' } }
//         ],
//         fallback: true
//     }
// }

// export async function getStaticProps(context: any) {
//     const { roomid } = context.params;
//     return {
//         props: { roomid }
//     }
// }

export default Editor;

// Editor.getInitialProps = async (context: any) => {
//     const { query } = context;
//     return { query };
// }

// export const getServerSideProps: GetServerSideProps = async (context: NextPageContext) => {
//     const { query } = context;
//     return { props: { query } };
// }
