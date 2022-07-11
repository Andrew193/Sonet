import {Box, Typography} from "@mui/material";
import s from '../settings.module.css'
import {useEffect, useState} from "react";
import {getSettings} from "../../db";
import {buttonsConfig} from "../../createPost/CreatePostLine";
import {useTranslation} from "react-i18next";
import UK from "../images/uk.png";
import UA from "../images/ua.png";

function GeneralSettings() {
    const [settings, setSettings] = useState({})
    const {t, i18n} = useTranslation();


    useEffect(() => {
        async function getSettingsConfig() {
            const response = await getSettings();

            setSettings(response[0]);
        }

        getSettingsConfig();
    }, [])

    const changeLanguage = lng => {
        i18n.changeLanguage(lng);
    };

    return (
        <>
            <Box
                className={s.FontMainContainer}
            >
                <Typography
                    className={s.FontLabel}
                >{t("UI language")}</Typography>
                <div
                    className={s.FontContainer + ' ' + s.ListStyleContainer + ' ' + s.Flags}
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