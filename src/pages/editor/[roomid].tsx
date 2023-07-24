import { useRouter } from "next/router";

interface RoomIDProps { };

const Editor = (props: RoomIDProps) => {
    const router = useRouter();
    const { roomid, username } = router.query;

    const copyHandler = () => {
        navigator.clipboard.writeText(roomid as string);
        return;
    };

    const leaveHandler = () => {
        router.push('/');
    };

    return (
        <>
            <div className='flex h-screen'>
                <div className='p-2 flex flex-col justify-between w-[20%] bg-burgundy'>
                    <div className='flex flex-col items-center'>
                        <div className='text-white text-center text-2xl font-medium'>LiveSyntax</div>
                        <div className='text-white text-center text-lg font-medium'>Room ID: {roomid}</div>
                        <div className='text-white text-center text-lg font-medium'>Username: {username}</div>
                    </div>
                    <div className='mb-4 flex items-center justify-center space-x-5'>
                        <button className='p-2 rounded-md font-medium bg-green-500 hover:bg-green-800 hover:text-brand-orange transition duration-300' onClick={copyHandler}>Copy Room ID</button>
                        <button className='p-2 rounded-md font-medium bg-red-500 hover:bg-red-800 hover:text-brand-orange transition duration-300' onClick={leaveHandler}>Leave Room</button>
                    </div>
                </div>
                <div className='p-2 w-[80%] bg-cement'>
                    <div>code editor</div>
                </div>
            </div>

        </>
    )

}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { roomid: 'test' } }
        ],
        fallback: true
    }
}

export async function getStaticProps(context: any) {
    const { roomid } = context.params;
    return {
        props: {
            roomid
        }
    }
}

export default Editor;
