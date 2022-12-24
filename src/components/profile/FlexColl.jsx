import React from "react";
import ProfileStyles from "./profile.module.css"
import {AiOutlineCalendar, AiOutlineMail, AiOutlineNumber, AiOutlineEye} from "react-icons/ai";
import ProfileHelper from "./profileHelper"
import {useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

function FlexColl(props) {
    const {
        userInfo,
        cr,
        up,
        myId,
        settings
    } = props;

    const history = useHistory();
    const {t} = useTranslation();

    return (
        <div
            className={ProfileStyles.FlexColl}
            style={{color: settings?.configs?.color[settings?.color]}}
        >
            <div className={ProfileStyles.SecondLine}>
                <span className={ProfileStyles.Black}>
                    <b>{userInfo.userName}</b>
                </span>
                <span>
                    <AiOutlineMail className={ProfileStyles.CommonIcon} style={{color: "black"}}/>
                    {myId !== userInfo.id ?
                        <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                        : <>{userInfo.email}</>}
                </span>
                <span>
                    <AiOutlineNumber className={ProfileStyles.CommonIcon} style={{color: "black"}}/>{userInfo.id}
                </span>
            </div>
            <div className={"wrap-link-line-v2"}>
                <AiOutlineCalendar className={ProfileStyles.CommonIcon} style={{color: "black"}}/> {t("Joined")} {cr}
            </div>
            <div style={{margin: "10px 0px"}} className={"wrap-link-line-v2"}>
                <AiOutlineCalendar className={ProfileStyles.CommonIcon} style={{color: "black"}}/>
                {t("Last update")} {cr === up ? t("Never") : up}
            </div>
            <div className={ProfileStyles.LastLine}>
                <span onClick={() => ProfileHelper.getMyFollowings(myId, history)}>
                    <AiOutlineEye className={ProfileStyles.CommonIcon} style={{color: "black"}}/>
                    <b className={ProfileStyles.Black}>{userInfo.youFolCount}</b> {t("Following")}
                </span>
                <span onClick={() => ProfileHelper.getMyFollowers(myId, history)}>
                    <AiOutlineEye className={ProfileStyles.CommonIcon} style={{color: "black"}}/>
                    <b className={ProfileStyles.Black}>{userInfo.folCount}</b> {t("Followers")}
                </span>
            </div>
        </div>
    )
}

FlexColl.propTypes = {
    userInfo: PropTypes.object,
    cr: PropTypes.string,
    up: PropTypes.string,
    myId: PropTypes.number,
    settings: PropTypes.object
};

export default FlexColl;