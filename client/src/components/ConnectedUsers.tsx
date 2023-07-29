import Avatar from 'react-avatar';

interface ConnectedUsersProps {
    client: {
        socketId: string;
        username: string;
    };
};

const ConnectedUsers = ({ client }: ConnectedUsersProps) => {
    return (
        <div className='flex flex-col items-center'>
            <Avatar name={client.username} size="50" round={true} />
            <div className='text-teal-300 text-center text-lg font-medium'>{client.username}</div>
        </div >
    )
}

export default ConnectedUsers;
