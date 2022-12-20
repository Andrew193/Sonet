import React from "react";
import s from "./profile.module.css"
import {AiOutlineCalendar, AiOutlineMail, AiOutlineNumber, AiOutlineEye} from "react-icons/ai";
import Script from "./profileHelper"
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
            className={s.FlexColl}
            style={{
                color: settings?.configs?.color[settings?.color]
            }}
        >
            <div className={s.SecondLine}>
                <span className={s.Black}>
                    <b>{userInfo.userName}</b>
                </span>
                <span>
                    <AiOutlineMail
                        className={s.CommonIcon}
                        style={{
                            color: "black"
                        }}
                    />
                    {myId !== userInfo.id ?
                        <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                        : <>{userInfo.email}</>}
                </span>
                <span>
                    <AiOutlineNumber
                        className={s.CommonIcon}
                        style={{
                            color: "black"
                        }}
                    />{userInfo.id}
                </span>
            </div>
            <div className={"wrap-link-line-v2"}>
                <AiOutlineCalendar
                    className={s.CommonIcon}
                    style={{
                        color: "black"
                    }}
                /> {t("Joined")} {cr}
            </div>
            <div
                style={{margin: "10px 0px"}}
                className={"wrap-link-line-v2"}
            >
                <AiOutlineCalendar
                    className={s.CommonIcon}
                    style={{
                        color: "black"
                    }}
                /> {t("Last update")} {cr === up ? t("Never") : up}
            </div>
            <div className={s.LastLine}>
                <span onClick={() => Script.getMyFollowings(myId, history)}>
                    <AiOutlineEye
                        className={s.CommonIcon}
                        style={{
                            color: "black"
                        }}
                    /> <b className={s.Black}>{userInfo.youFolCount}</b> {t("Following")}
                </span>
                <span onClick={() => Script.getMyFollowers(myId, history)}>
                    <AiOutlineEye
                        className={s.CommonIcon}
                        style={{
                            color: "black"
                        }}
                    /><b className={s.Black}>{userInfo.folCount}</b> {t("Followers")}
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