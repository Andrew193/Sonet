import React, {useMemo} from "react";
import s from "./solid-textarea.module.css";
import {alpha} from "@mui/material";
import {useSettings} from "../../hooks";
import {handleOnMentionSelect} from "./possibleMentionsHelper";

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

    const {settings} = useSettings();
    const possibleMentionsConfig = useMemo(() => possibleMentions.map((person) =>
        <p key={person.id}
           onClick={() => handleOnMentionSelect(selectedMention, person, setValue, onChangeHandler, postInformation, setPossibleMentions, value)}
        >{person.userName}</p>), [possibleMentions])

    return (
        <>
            <style>{`
            .${s.PossiblePeople} p:hover {
            background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(203, 203, 243)", 0.7)};
            }
            `}</style>
            {possibleMentions?.length ? <div
                className={s.PossiblePeople}
                style={{
                    background: alpha(settings?.configs?.color[settings?.color] || "rgb(203, 203, 243)"),
                    border: `1px solid ${settings?.configs?.color[settings?.color]}`
                }}
            >
                {possibleMentionsConfig}
            </div> : null}
        </>
    )
}

export default PossibleMentions;