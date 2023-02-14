import React from "react";
import SolidTextareaStyles from "../solid-textarea.module.css";
import {getStore} from "../../../app/store";

const OverLimit = ({children}) => <span className={SolidTextareaStyles.Editor__OverLimit}>{children}</span>

export const createOverLimitDecorator = (maxChars) => {
    function overLimitStrategy(contentBlock, callback) {
        const postInformation = getStore()?.getState()?.post?.postInformation;
        const length = postInformation?.length + 1;
        if (length >= maxChars) {
            callback(maxChars, length);
        }
    }

    return {
        strategy: overLimitStrategy,
        component: OverLimit
    };
};
