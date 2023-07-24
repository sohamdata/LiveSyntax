import CodeMirror from '@uiw/react-codemirror';
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";

const TextEditor = () => {
    return (
        <CodeMirror
            value={"universal universe"}
            style={{ color: 'black' }}
            theme={tokyoNightStorm}
            height="90vh"
        />
    )
}

export default TextEditor;
