import React from "react";
import s from "../solid-textarea.module.css";

function comboStrategy(contentBlock, callback, regex) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
}

export const highlightLinks = (regex) => {
    function basicStrategy(contentBlock, callback) {
        comboStrategy(contentBlock, callback, regex)
    }

    return {
        strategy: basicStrategy,
        component: LinkPin
    };
};

export const highlightHash = (regex) => {
    function basicStrategy(contentBlock, callback) {
        comboStrategy(contentBlock, callback, regex)
    }

    return {
        strategy: basicStrategy,
        component: HashPin
    };
};

function HashPin({children}) {
    return <span className={s.Editor__Highlight}>{children}</span>;
}

function LinkPin({children}) {
    return <a className={s.Editor__Highlight__Link} href={children[0].props.text}>{children}</a>;
}
