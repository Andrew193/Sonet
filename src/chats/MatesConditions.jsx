import Loader from "../components/common/spinner/Spinner";
import {MdSentimentVeryDissatisfied} from "react-icons/all";
import {useTranslation} from "react-i18next";
import React from "react";
import PropTypes from "prop-types";

function MatesConditions(props) {
    const {
        matesListLength,
        isLoading
    } = props;

    const {t} = useTranslation();

    return (
        <>
            {(isLoading && !matesListLength) && <div className={"chatLoader"}><Loader/></div>}
            {
                (!isLoading && !matesListLength) &&
                <div className={"lonelyLine"}>
                    <MdSentimentVeryDissatisfied/>
                    <span>{t("You are lonely")})</span>
                </div>
            }
        </>
    )
}

MatesConditions.propTypes = {
    matesListLength: PropTypes.number,
    isLoading: PropTypes.bool
};

export default MatesConditions;