import s from "./profile.module.css"
import s2 from "../common/navigationLine/style.module.css"
import Script from "./profileHelper"
import {useRef} from "react";
import {AiOutlineSafetyCertificate, AiOutlineSecurityScan} from "react-icons/ai";
import {buttonsConfig} from "../../createPost/CreatePostLine";
import {useTranslation} from "react-i18next";

function VerificationLine(props) {
    let text = useRef();
    const {
        userInfo,
        myId,
        settings
    } = props;

    const {t} = useTranslation();

    return (
        <div className={s.Ver}>
            <div className={s.ConfirmLine + " Hide Mconfirm"}>
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
                    onClick={() => {
                        Script.confirmPerson("Mconfirm", text.value, userInfo.email)
                    }}
                    style={{
                        padding:"3px 5px"
                    }}
                    className={`${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                >{t("Confirm")}</span>
            </div>
            {userInfo.ver ? <AiOutlineSafetyCertificate className={s.CommonIcon + " " + s2.Icon}/> :
                myId === userInfo.id ?
                    <AiOutlineSecurityScan
                        className={s.CommonIcon + " " + s2.Icon}
                        onClick={() => {
                            Script.openModal("Mconfirm")
                        }}
                    />
                    :
                    <AiOutlineSecurityScan className={s.CommonIcon + " " + s2.Icon}/>
            }
        </div>
    )
}

export default VerificationLine;