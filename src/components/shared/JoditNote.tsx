import JoditEditor from 'jodit-react';
import 'jodit/es2021/jodit.min.css';
import { useRef } from 'react';

interface NoteTabProps {
    handleContentChange?: any;
    content?: string;
    height?: string;
    isDisabled?: boolean;
}
const JoditNote = ({ handleContentChange, content, height = '60vh', isDisabled = false }: NoteTabProps) => {
    const editor = useRef(null);

    const config = {
        readonly: false,
        placeholder: 'Type your notes here..',
        toolbarSticky: false,
        height: height,
        disabled: isDisabled,
        style: {
            background: '#fff',
            borderRadius: '6px',
        },
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
    };

    return (
        <div
            className=""
            style={{
                borderRadius: '11px',
            }}
        >
            <JoditEditor
                ref={editor}
                value={content || ''}
                config={config}
                onBlur={(newContent) => handleContentChange(newContent)}
                onChange={() => {}}
            />
        </div>
    );
};

export default JoditNote;
