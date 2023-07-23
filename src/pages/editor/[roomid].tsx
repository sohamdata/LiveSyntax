import { useRouter } from "next/router";

interface RoomIDProps { };

const Editor = (props: RoomIDProps) => {
    const router = useRouter();
    console.log(router.query);
    const { roomid, username } = router.query;

    return (
        <>
            <h1>Code Editor here</h1>
            <p>Room ID: {roomid}</p>
            <p>Username: {username}</p>
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
