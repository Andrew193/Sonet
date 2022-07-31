import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {composeDecorators} from "./utils/composeDecorators";
import {useField} from "usetheform";
import {Editor, EditorState} from "draft-js";
import s from "./solid-textarea.module.css";
import {useSelector} from "react-redux";
import {BiTrash} from "react-icons/all";
import {getStore} from "../../app/store";
import {setPostInformation} from "../../app/postReducer";

export const DraftEditor = ({maxChars, name = "editorState"}) => {
    const postInformation = useSelector(store => store?.post?.postInformation);

    const initialState = useMemo(
        () => EditorState.createEmpty(composeDecorators(maxChars)),
        [maxChars]
    );

    const {value, setValue} = useField({
        type: "custom",
        name,
        value: initialState
    });

    const onInputChange = useCallback((editorState) => setValue(editorState), [setValue]);

    const refEditor = useRef(null);
    useField({
        type: "custom",
        name: "refEditor",
        value: refEditor
    });

    const ref = useRef(null);
    const [maxWidth, setMaxWidth] = useState(10000);
    const clear = () => setValue(EditorState.createEmpty(composeDecorators(maxChars)))

    useEffect(() => {
        setMaxWidth(ref.current ? ref.current.offsetWidth : 0)
    }, [ref.current]);

    useEffect(() => {
        if (postInformation?.shouldClear) {
            clear();
            const dispatch = getStore().dispatch;
            dispatch(setPostInformation({shouldClear: false}))
        }
    }, [postInformation?.shouldClear])

    return (
        <div
            className={s.Editor}
            ref={ref}
            style={{
                maxWidth: `${maxWidth}px`,
                color: `${postInformation?.length > 140 ? "#ff0000" : ""}`,
                background: `${postInformation?.length > 140 ? "#f4caca" : ""}`
            }}
        >
            <span
                className={s.Editor__Clear}
                onClick={() => clear()}
            >
                <BiTrash/>
            </span>
            <Editor
                ref={refEditor}
                editorState={value}
                onChange={onInputChange}
                placeholder=""
            />
        </div>
    );
};
