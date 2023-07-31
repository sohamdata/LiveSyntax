import { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNightStorm } from '@uiw/codemirror-theme-tokyo-night-storm';
import { javascript } from '@codemirror/lang-javascript';

const TextEditor = ({ socketRef }: any) => {
    const [code, setCode] = useState('');

    useEffect(() => {
        const innit = async () => {
            socketRef.current.on('code-change', (updatedCode: any) => {
                setCode(updatedCode);
            });
        };

        innit();

        return () => {
            socketRef.current.off('code-change');
        };
    }, [code]);

    const handleCodeChange = (value: string) => {
        setCode(value);
        socketRef.current.emit('code-change', value);
    };

    return (
        <CodeMirror
            value={code}
            onChange={handleCodeChange}
            style={{ color: 'black' }}
            extensions={[javascript()]}
            theme={tokyoNightStorm}
            height="100vh"
        />
    );
};

export default TextEditor;
