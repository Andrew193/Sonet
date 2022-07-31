import React from "react";
import s from "../solid-textarea.module.css";
import {getStore} from "../../../app/store";

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

function OverLimit({children}) {
    return <span className={s.Editor__OverLimit}>{children}</span>;
}
