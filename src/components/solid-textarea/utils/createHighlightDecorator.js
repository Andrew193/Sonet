import React from "react";
import s from "../solid-textarea.module.css";

export const createHighlightDecorator = (regex) => {
    function hashTagStrategy(contentBlock, callback) {
        const text = contentBlock.getText();
        let matchArr, start;
        while ((matchArr = regex.exec(text)) !== null) {
            start = matchArr.index;
            callback(start, start + matchArr[0].length);
        }
    }

    return {
        strategy: hashTagStrategy,
        component: HashTag
    };
};

function HashTag({children}) {
    return <span className={s.Editor__Highlight}>
  {children}
  </span>;
}
