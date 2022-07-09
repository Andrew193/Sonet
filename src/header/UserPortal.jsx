import {createPortal} from "react-dom";
import {useHistory} from "react-router";
import CommonHelper from "../helpers/common"
import s from "./header.module.css"
import Script from "./script.js"
import Script2 from "../components/profile/profileHelper";
import {useOutsideClick} from "../hooks";
import {useRef} from "react";
import {Divider} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {AiOutlineSecurityScan} from "react-icons/ai";
import {hexToRgb} from "../utils";
import {useTranslation} from "react-i18next";

function Portal(props) {
    const {
        click,
        customStyles
    } = props;

    const {id, userName: name} = Script.GetInfo();
    const {t} = useTranslation();
    const history = useHistory();
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        click(false);
    })

    return createPortal(
        <div
            className={s.UserPortal}
            onClick={click}
            ref={wrapperRef}
            style={{
                fontSize: customStyles?.fontSize,
                color: customStyles?.color,
                background: customStyles?.background,
                boxShadow: `0px 0px 8px 0px rgb(${hexToRgb(customStyles?.color)?.r} ${hexToRgb(customStyles?.color)?.g} ${hexToRgb(customStyles?.color)?.b} / 80%)`
            }}
        >
            <div>
                <Avatar
                    style={{
                        fontSize: customStyles?.fontSize,
                        color: customStyles?.color,
                    }}
                >{name[0]}</Avatar>
                <div
                    onClick={() => {
                        CommonHelper.redirect(history, null, "/profile")
                    }}
                    style={{alignItems: 'flex-start'}}
                >
                    <span className={"fs_font-bold"}>{name}</span>
                    <span>#{id}</span>
                </div>
                <div>
                    <AiOutlineSecurityScan/>
                </div>
            </div>

            <Divider
                className={"divider_default"}
                light
            />

            <p
                id={s.Controle}
                onClick={() => {
                    window?.document?.body?.querySelector(".App")?.classList?.add("Open")
                    Script2.openModal("Muser")
                }}
                style={{
                    fontSize: customStyles?.fontSize,
                    color: customStyles?.color,
                    background: customStyles?.background
                }}
            >{t("Set up profile")}</p>
            <p
                id={s.Controle}
                onClick={() => {
                    Script.leave(history)
                }}
                style={{
                    fontSize: customStyles?.fontSize,
                    color: customStyles?.color,
                    background: customStyles?.background
                }}
            >{t("Log out")} @{name}</p>
        </div>
        , document.body.querySelector(`.${props.s}`))
}

export default Portal;