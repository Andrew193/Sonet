import React from "react";
import {useSelector} from "usetheform";
import {ProgressRingBar} from "./ProgressRingBar";
import {getProgressRingBarProps} from "./utils/getProgressRingBarProps";
import SolidTextareaStyles from "../solid-textarea.module.css";
import PropTypes from "prop-types";

export const CharacterCounter = (props) => {
    const {
        maxChars
    } = props;
    const [plainText] = useSelector((state) => state.editor.plainText);

    const {uiStatus, ...propsRingBar} = getProgressRingBarProps(
        plainText,
        maxChars
    );

    return (
        <div data-ui={uiStatus} className={SolidTextareaStyles.ProgressRingBar}>
            <ProgressRingBar {...propsRingBar} />
        </div>
    );
};

CharacterCounter.propTypes = {
    maxChars: PropTypes.number
}