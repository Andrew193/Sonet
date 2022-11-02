import {AiOutlineClose} from "react-icons/all";
import {useTranslation} from "react-i18next";
import textareaStyles from "../components/solid-textarea/solid-textarea.module.css";

function RequestsConditions(props) {
    const {
        possibleMatesList
    } = props;

    const {t} = useTranslation();

    return (
        <>
            {
                possibleMatesList?.every(v => v === null)
                    ?
                    <>
                        <div className={textareaStyles.ThematicBreak}/>
                        <div className={"lonelyLine"}>
                            <AiOutlineClose/>
                            <span>{t("Out of requests")}</span>
                        </div>
                    </>
                    : <>{possibleMatesList}</>
            }
        </>
    )
}

export default RequestsConditions;