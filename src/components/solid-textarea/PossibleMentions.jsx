import React, {useMemo} from "react";
import SolidTextareaStyles from "./solid-textarea.module.css";
import {alpha} from "@mui/material";
import {useSettings} from "../../hooks";
import {handleOnMentionSelect} from "./possibleMentionsHelper";
import {getItemFromLocalStorage} from "../../localStorageService";
import LazyImage from "../../posts/LazyImage";
import {USER_INFORMATION} from "../../vars";
import PropTypes from "prop-types";

function PossibleMentions(props) {
    const {
        possibleMentions,
        value,
        setValue,
        onChangeHandler,
        postInformation,
        setPossibleMentions,
        selectedMention,
    } = props;

    const id = getItemFromLocalStorage(USER_INFORMATION, "id");
    const {settings} = useSettings();
    const possibleMentionsConfig = useMemo(() => possibleMentions.map((person) =>
        person.id !== id
            ? <p key={person.id}
                 onClick={() => handleOnMentionSelect(selectedMention, person, setValue, onChangeHandler, postInformation, setPossibleMentions, value)}
            >
                <LazyImage imageSrc={person.avatar} imgClass={"conversationImg"}/>
                {person.userName}</p> : null), [possibleMentions])

    return (
        <>
            <style>{`
            .${SolidTextareaStyles.PossiblePeople} p:hover {
            background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(203, 203, 243)", 0.7)};
            }
            `}</style>
            {possibleMentions?.length ? <div
                className={SolidTextareaStyles.PossiblePeople}
                style={{
                    background: alpha(settings?.configs?.color[settings?.color] || "rgb(203, 203, 243)"),
                    border: `1px solid ${settings?.configs?.color[settings?.color]}`
                }}
            >{possibleMentionsConfig}</div> : null}
        </>
    )
}

PossibleMentions.propTypes = {
    possibleMentions: PropTypes.array,
    value: PropTypes.object,
    setValue: PropTypes.func,
    onChangeHandler: PropTypes.func,
    postInformation: PropTypes.object,
    setPossibleMentions: PropTypes.func,
    selectedMention: PropTypes.string,
}

export default PossibleMentions;