import React from "react";

function createHTML(info) {
    const {title, message} = info;
    return <>
        <h3>{title}</h3>
        <p>{message}</p>
    </>
}

function stringFromJSON(json) {
    if (json) {
        return Object.values(json).reduce((value, current) => value += Object.values(current).join(". "), "")
    }
    return null;
}

const obj = {createHTML, stringFromJSON};

export default obj;