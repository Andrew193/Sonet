import React from "react";
import { Collection, Input } from "usetheform";
import { DraftEditor } from "./DraftEditor";
import { extractPlainText } from "./utils/extractPlainText";
import { limitTo } from "./utils/limitTo";

export const WhatsHappeningBar = (props) => {
    const {
        onInputChange,
        maxChars,
        value
    } = props;

    return (
        <div>
            <Collection
                object
                name="editor"
                validators={[limitTo(maxChars)]}
                reducers={extractPlainText}
            >
                <DraftEditor
                    name="editorState"
                    maxChars={maxChars}
                    onInputChange={onInputChange}
                    value={value}
                />
                <Input type="hidden" name="plainText" />
            </Collection>
        </div>
    );
};
