import React from "react";
import s from "../solid-textarea.module.css";
import HttpHelper from "../../../helpers/httpHelper";
import {setPostInformation} from "../../../app/postReducer";
import {getStore} from "../../../app/store";

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

export const highlightPerson = (regex, onChangeHandler) => {
    function basicStrategy(contentBlock, callback) {
        comboStrategy(contentBlock, callback, regex)
    }

    return {
        strategy: basicStrategy,
        component: (props) => MentionPin(props, onChangeHandler)
    };
};

function HashPin({children}) {
    return <span className={s.Editor__Highlight + " " + s.Editor_hashtag}>{children}</span>;
}

function MentionPin(props, onChangeHandler) {
    const dispatch = getStore().dispatch;
    const postInformation = getStore().getState().post.postInformation;
    if (props && postInformation.selectedMention) {
        onChangeHandler(showPossiblePeople);
    }

    if (props.start < postInformation.focusPosition && postInformation.focusPosition < props.end) {
        dispatch(setPostInformation({selectedMention: props.decoratedText}));
    } else {
        dispatch(setPostInformation({selectedMention: ""}));
    }

    return <li
        className={s.Editor__Highlight + " " + s.Editor_mention}
        style={{display: "inline-block"}}
    >{props.decoratedText} <span style={{display: "none"}}>{props.children}</span></li>;
}

function showPossiblePeople(name) {
    return HttpHelper.USERS.getUserByName(name.trim().slice(1))
        .then((response) => {

            return response.data.user;
        })
        .catch((error) => [])
}

function LinkPin({children}) {
    return <a className={s.Editor__Highlight + " " + s.Editor_link} href={children[0].props.text}>{children}</a>;
}
