import React from "react";
import ProfileStyles from "./profile.module.css"
import NavigationLineStyles from "../common/navigationLine/navigation-line.module.css"
import ProfileHelper from "./profileHelper"
import {useRef} from "react";
import {AiOutlineSafetyCertificate, AiOutlineSecurityScan} from "react-icons/ai";
import {buttonsConfig} from "../../create-post/CreatePostLine";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

function VerificationLine(props) {
    let text = useRef();
    const {
        userInfo,
        myId,
        settings
    } = props;

    const {t} = useTranslation();

    return (
        <div className={ProfileStyles.Ver}>
            <div className={`${ProfileStyles.ConfirmLine} Hide Mconfirm`}>
                <input
                    placeholder={t("Input your email")}
                    ref={(el) => text = el}
                    style={{
                        color: settings?.configs?.color[settings?.color],
                        borderBottomColor: settings?.configs?.color[settings?.color]
                    }}
                />
                <span
                    id="mainPostBtn"
                    onClick={() => ProfileHelper.confirmPerson("Mconfirm", text.value, userInfo.email)}
                    style={{
                        padding: "3px 5px"
                    }}
                    className={`${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                >{t("Confirm")}</span>
            </div>
            {userInfo.ver ?
                <AiOutlineSafetyCertificate className={`${ProfileStyles.CommonIcon} ${NavigationLineStyles.Icon}`}/> :
                myId === userInfo.id ?
                    <AiOutlineSecurityScan
                        className={`${ProfileStyles.CommonIcon} ${NavigationLineStyles.Icon}`}
                        onClick={() => ProfileHelper.openModal("Mconfirm")}
                    />
                    :
                    <AiOutlineSecurityScan className={`${ProfileStyles.CommonIcon} ${NavigationLineStyles.Icon}`}/>
            }
        </div>
    )
}

VerificationLine.propTypes = {
    userInfo: PropTypes.object,
    myId: PropTypes.number,
    settings: PropTypes.object
};

export default VerificationLine;