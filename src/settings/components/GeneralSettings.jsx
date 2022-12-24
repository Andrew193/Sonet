import {Box, Typography} from "@mui/material";
import React from "react";
import SettingsStyles from '../settings.module.css'
import {buttonsConfig} from "../../create-post/CreatePostLine";
import {useTranslation} from "react-i18next";
import UK from "../images/uk.png";
import UA from "../images/ua.png";
import {useSettings} from "../../hooks";

function GeneralSettings() {
    const {settings} = useSettings()
    const {t, i18n} = useTranslation();

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <Box className={SettingsStyles.FontMainContainer}>
                <Typography className={SettingsStyles.FontLabel}>{t("UI language")}</Typography>
                <div
                    className={`${SettingsStyles.FontContainer} ${SettingsStyles.ListStyleContainer} ${ SettingsStyles.Flags}`}
                >
                    <div className={`${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                         style={{color: `${i18n?.language === "en" ? "red" : ""}`}}
                         onClick={() => changeLanguage("en")}
                    >
                        <img src={UK} alt={"English"}/>
                    </div>
                    <div className={`${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                         style={{color: `${i18n?.language === "ua" ? "red" : ""}`}}
                         onClick={() => changeLanguage("ua")}
                    >
                        <img src={UA} alt={"Ukrainian"}/>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default GeneralSettings;