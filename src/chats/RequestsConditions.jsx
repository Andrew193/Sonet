import {AiOutlineClose} from "react-icons/all";
import {useTranslation} from "react-i18next";
import TextareaStyles from "../components/solid-textarea/solid-textarea.module.css";
import React from "react";
import PropTypes from "prop-types";

function RequestsConditions(props) {
    const {
        possibleMatesList
    } = props;

    const {t} = useTranslation();

    return (
        <>
            {
                possibleMatesList?.every(v => v === null) ?
                    <>
                        <div className={TextareaStyles.ThematicBreak}/>
                        <div className={"lonelyLine"}>
                            <AiOutlineClose/>
                            <span>{t("Out of requests")}</span>
                        </div>
                    </> : <>{possibleMatesList}</>
            }
        </>
    )
}

RequestsConditions.propTypes = {
    possibleMatesList: PropTypes.array,
};

export default RequestsConditions;