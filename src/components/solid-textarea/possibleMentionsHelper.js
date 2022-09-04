import {convertFromRaw, EditorState} from "draft-js";
import {composeDecorators} from "./utils/composeDecorators";
import {setPostInformation} from "../../app/postReducer";
import {getStore} from "../../app/store";

export function handleOnMentionSelect(selectedMention, person, setValue, onChangeHandler, postInformation, setPossibleMentions,
                                      value) {
    const editorStateText = value.getCurrentContent().getPlainText('\u0001');
    const extraReplace = `@${person.userName}`.replaceAll(selectedMention.trim(), `@${person.userName}`);
    const dispatch = getStore().dispatch;
    const newState = EditorState.createWithContent(convertFromRaw({
        entityMap: [],
        blocks: [
            {
                text: editorStateText.replaceAll(selectedMention.trim(), `@${person.userName}`).replaceAll(extraReplace, `@${person.userName}`).trim() + " ",
                key: 'foo',
                type: 'styled',
                entityRanges: [],
            },
        ],
    }))

    setValue(EditorState.set(newState, {decorator: composeDecorators(onChangeHandler)}));

    const timer = setTimeout(() => {
        dispatch(setPostInformation([{possibleMentions: [...postInformation.possibleMentions, person]},
            {selectedMention: ""}]));
        setPossibleMentions([]);
        clearTimeout(timer);
    }, 500)
}