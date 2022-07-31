import React from "react";
import { useSelector } from "usetheform";
import { ProgressRingBar } from "./ProgressRingBar";
import { getProgressRingBarProps } from "./utils/getProgressRingBarProps";
import s from "../solid-textarea.module.css";

export const CharacterCounter = (props) => {
    const {
        maxChars
    } = props;
    const [plainText] = useSelector((state) => state.editor.plainText);

    const { uiStatus, ...propsRingBar } = getProgressRingBarProps(
        plainText,
        maxChars
    );

    return (
        <div data-ui={uiStatus} className={s.ProgressRingBar}>
            <ProgressRingBar {...propsRingBar} />
        </div>
    );
};
