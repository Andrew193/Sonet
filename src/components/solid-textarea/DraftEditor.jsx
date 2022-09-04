import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {composeDecorators} from "./utils/composeDecorators";
import {useField} from "usetheform";
import {Editor, EditorState} from "draft-js";
import s from "./solid-textarea.module.css";
import {useDispatch, useSelector} from "react-redux";
import {BiTrash} from "react-icons/all";
import {getStore} from "../../app/store";
import {setPostInformation} from "../../app/postReducer";
import {withDelay} from "../../app/helpers";
import PossibleMentions from "./PossibleMentions";

export const DraftEditor = ({maxChars, name = "editorState"}) => {
    const postInformation = useSelector(store => store?.post?.postInformation);
    const [focusPosition, setFocusPosition] = useState(null);
    const dispatch = useDispatch();
    const [possibleMentions, setPossibleMentions] = useState([]);
    const onChangeHandler = withDelay(500,
        (callback) => {
            const selectedMention = getStore().getState().post.postInformation.selectedMention
            callback(selectedMention || "").then((users) => {
                setPossibleMentions(() => users);
            })
        })

    const initialState = useMemo(() => EditorState.createEmpty(composeDecorators(onChangeHandler)),
        [maxChars]);
    const {value, setValue} = useField({type: "custom", name, value: initialState});
    const onInputChange = useCallback((editorState) => {
        setFocusPosition(() => editorState._immutable.selection.focusOffset)
        setValue(editorState)
    }, [setValue]);

    const refEditor = useRef(null);
    useField({type: "custom", name: "refEditor", value: refEditor});

    const ref = useRef(null);
    const [maxWidth, setMaxWidth] = useState(10000);
    const clear = () => {
        setValue(EditorState.createEmpty(composeDecorators(onChangeHandler)));
        const timer = setTimeout(() => {
            dispatch(setPostInformation({selectedMention: ""}));
            setPossibleMentions([])
            clearTimeout(timer);
        }, 500)
    }

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

    useEffect(() => {
        dispatch(setPostInformation({focusPosition: focusPosition}));
    }, [focusPosition])

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
            <PossibleMentions
                possibleMentions={possibleMentions}
                value={value}
                setValue={setValue}
                onChangeHandler={onChangeHandler}
                postInformation={postInformation}
                setPossibleMentions={setPossibleMentions}
                selectedMention={postInformation.selectedMention}
            />
        </div>
    );
};
