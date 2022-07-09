import {AiOutlineClose} from "react-icons/all";
import {useTranslation} from "react-i18next";

function RequestsConditions(props) {
    const {
        possibleMatesList
    } = props;

    const {t} = useTranslation();

    return (
        <>
            {
                possibleMatesList.every(v => v === null)
                    ?
                    <div className={"lonelyLine"}>
                        <AiOutlineClose/>
                        <span>{t("Out of requests")}</span>
                    </div>
                    : <>{possibleMatesList}</>
            }
        </>
    )
}

export default RequestsConditions;