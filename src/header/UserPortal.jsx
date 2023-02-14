import React from "react";
import {createPortal} from "react-dom";
import {useHistory} from "react-router";
import CommonHelper from "../helpers/common"
import HeaderStyles from "./header.module.css"
import Script from "./script.js"
import ProfileHelper from "../components/profile/profileHelper";
import {useOutsideClick} from "../hooks";
import {useEffect, useRef, useState} from "react";
import {Divider} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {AiOutlineSecurityScan} from "react-icons/ai";
import {hexToRgb} from "../utils";
import {useTranslation} from "react-i18next";

function setTooltipPosition(setPortalStyles, parentConfig) {
    const target = parentConfig;

    let left = target?.screenX - 150;
    if (left < 0) left = 0;

    let top = target?.clientY + 20;
    if (top < 0) {
        top = target?.clientY + 35;
    }

    if (top + 200 > window?.innerHeight - 100) {
        top -= 200;
    } else if (top + 100 > window?.innerHeight - 100) {
        top -= 100;
    }

    setPortalStyles({
        left: `${left}px`,
        top: `${top}px`
    })
}

const colorPair = {
    "#2177e8": "rgb(226 237 250)",
    "#b32dd2": "rgb(240 219 245)",
    "#bd9d33": "rgb(255 251 236)",
    "#FF7F50": "rgb(253 244 241)",
    "#0a00ce": "rgb(227 226 251)",
    "#008000": "rgb(238 247 238)",
    "#FFA500": "rgb(255 251 246)",
    "#FF0000": "rgb(248 236 236)"
}

function Portal(props) {
    const {
        click,
        customStyles,
        parentConfig
    } = props;

    const {id, userName: name} = Script.GetShortUserInformation();
    const {t} = useTranslation();
    const history = useHistory();
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        click(false);
    })

    const [portalStyles, setPortalStyles] = useState({});

    useEffect(() => {
        if (parentConfig) {
            setTooltipPosition(setPortalStyles, parentConfig);
        }
    }, [parentConfig])

    return createPortal(
        <div
            className={HeaderStyles.UserPortal}
            onClick={click}
            ref={wrapperRef}
            style={{
                ...portalStyles,
                fontSize: customStyles?.fontSize,
                color: customStyles?.color,
                background: colorPair[customStyles?.color],
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
                    onClick={() => CommonHelper.redirect(history, null, "/profile")}
                    style={{alignItems: 'flex-start'}}
                >
                    <span className={"fs_font-bold"}>{name}</span>
                    <span>#{id}</span>
                </div>
                <div>
                    <AiOutlineSecurityScan/>
                </div>
            </div>

            <Divider className={"divider_default"} light/>

            <p
                id={HeaderStyles.Controle}
                onClick={() => {
                    window?.document?.body?.querySelector(".App")?.classList?.add("Open")
                    ProfileHelper.openModal("Muser")
                }}
                style={{
                    fontSize: customStyles?.fontSize,
                    color: customStyles?.color,
                    background: customStyles?.background
                }}
            >{t("Set up profile")}</p>
            <p
                id={HeaderStyles.Controle}
                onClick={() => Script.logout(history)}
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