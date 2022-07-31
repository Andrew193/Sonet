import s from "./textarea.module.css";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {useRef, useState} from "react";
import {BsEmojiSmile} from "react-icons/all";

function insert(elementRef, valueToInsert, setNewElementValue) {
    const cursorPosition = elementRef.current.selectionStart;
    const textBeforeCursorPosition = elementRef.current.value.substring(0, cursorPosition);
    const textAfterCursorPosition = elementRef.current.value.substring(cursorPosition, elementRef.current.value.length);

    setNewElementValue(textBeforeCursorPosition + valueToInsert + textAfterCursorPosition)
}

function Textarea(props) {
    const {
        setText,
        text
    } = props;

    let textarea = useRef();
    const [isOpened, setIsOpened] = useState(false);

    return (
        <>
            <div
                className={s.MainCover}
            >
                {isOpened && <Picker
                    data={data}
                    onEmojiSelect={(e) => {
                        insert(textarea, e?.native, setText)
                        setIsOpened(false)
                    }}
                />}
                <textarea
                    className={s.Container}
                    onChange={(e) => {
                        setText(e?.value);
                    }}
                    ref={textarea}
                    value={text}
                />
                <BsEmojiSmile
                    onClick={() => {
                        setIsOpened(true)
                    }}
                />
            </div>
        </>
    )
}

export default Textarea;