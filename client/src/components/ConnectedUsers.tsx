import Avatar from 'react-avatar';

interface ConnectedUsersProps {
    client: {
        socketId: number;
        name: string;
    };
};

const ConnectedUsers = ({ client }: ConnectedUsersProps) => {
    return (
        <div className='flex flex-col items-center'>
            <Avatar name={client.name} size="50" round={true} />
            <div className='text-teal-300 text-center text-lg font-medium'>{client.name}</div>
        </div >
    )
}

export default ConnectedUsers;
