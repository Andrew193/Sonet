import MatesConditions from "./MatesConditions";
import {useTranslation} from "react-i18next";

function MatesContainer(props) {
    const {
        matesList,
        isLoading
    } = props;

    const {t} = useTranslation();

    return(
        <>
            <h3>{t("Mates")}</h3>
            {matesList}
            <MatesConditions
                matesListLength={matesList?.length}
                isLoading={isLoading}
            />
        </>
    )
}

export default MatesContainer;