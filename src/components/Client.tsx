import Avatar from 'react-avatar';

interface ClientProps {
    client: {
        socketId: number;
        name: string;
    };
};

const Client = ({ client }: ClientProps) => {
    return (
        <div className='flex flex-col items-center'>
            <Avatar name={client.name} size="50" round={true} />
            <div className='text-teal-300 text-center text-lg font-medium'>{client.name}</div>
        </div >
    )
}

export default Client;
