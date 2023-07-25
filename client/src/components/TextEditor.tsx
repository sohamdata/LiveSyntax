import CodeMirror from '@uiw/react-codemirror';
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { javascript } from '@codemirror/lang-javascript';

const TextEditor = () => {
    return (
        <CodeMirror
            value={tempCode}
            style={{ color: 'black' }}
            extensions={[javascript()]}
            theme={tokyoNightStorm}
            height="100vh"
        />
    )
}

export default TextEditor;

const tempCode = `import CodeMirror from '@uiw/react-codemirror';
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { javascript } from '@codemirror/lang-javascript';

const TextEditor = () => {
    return (
        <CodeMirror
            value={"universal universe"}
            style={{ color: 'black' }}
            extensions={[javascript()]}
            theme={tokyoNightStorm}
            height="100vh"
        />
    )
}

export default TextEditor;
`;
