import React from "react";
import AuthStyles from "./auth.module.css";
import {alpha} from "@mui/material";
import {hexToRgb as muiHexToRgb} from "@mui/system/colorManipulator";
import {useState} from "react";
import PasswordReset from "./PasswordReset";
import AuthInnerContainer, {AuthInnerContainerType} from "./AuthInnerContainer";
import {getElementsThemeConfig, getPropertiesConfig} from "../utils";

type AuthType = Omit<AuthInnerContainerType<"">, "setRecreatePasswordMode">

function Auth(props: AuthType) {
    const {
        Formik,
        setIsRegisterUser,
        isRegisterUser,
        styleSettings
    } = props;

    const [recreatePasswordMode, setRecreatePasswordMode] = useState(false);

    return (
        <div
            className={AuthStyles.Container}
            style={{...getElementsThemeConfig(styleSettings, getPropertiesConfig())}}
        >
            <style>
                {`
                    #btnEnter {
                    ${recreatePasswordMode ? "top: 30%" : ""};
                    ${recreatePasswordMode ? "width: 50px" : ""};
                    ${recreatePasswordMode ? "height: 50px" : ""};
                    color: ${styleSettings?.configs?.color[styleSettings?.color]} !important;
                    border: 6px solid ${muiHexToRgb(styleSettings?.configs?.background[styleSettings?.background] || "rgb(231 231 240)")}  !important;
                    }
                    
                    #btnEnter:hover {
                     box-shadow: -1px -1px 29px 0px ${alpha(muiHexToRgb(styleSettings?.configs?.color[styleSettings?.color] || "rgb(231 231 240)"), 0.5)};
                     text-shadow: 0px 0px 10px ${styleSettings?.configs?.color[styleSettings?.color] || "#0a00ce"} !important;
                    }
                    
                    #modeLinks:hover {
                    text-shadow: 0px 0px 10px ${styleSettings?.configs?.color[styleSettings?.color] || "#0a00ce"};
                    color: ${styleSettings?.configs?.color[styleSettings?.color] || "#2525ac"};
                    }
                    `}
            </style>
            {
                !recreatePasswordMode
                    ? <AuthInnerContainer
                        Formik={Formik}
                        isRegisterUser={isRegisterUser}
                        setIsRegisterUser={setIsRegisterUser}
                        styleSettings={styleSettings}
                        setRecreatePasswordMode={setRecreatePasswordMode}
                    />
                    : <PasswordReset
                        setRecreatePasswordMode={setRecreatePasswordMode}
                        styleSettings={styleSettings}
                    />
            }
        </div>
    )
}

export default Auth;