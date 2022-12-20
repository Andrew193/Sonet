import {Box, hexToRgb} from "@mui/material";
import s from './settings.module.css';
import React from "react";
import SettingsContent from "./SettingsContent";
import {useSettings} from "../hooks";
import {getEmptyElementsThemeConfig} from "../utils";

function SettingsContainerPage() {
    const {settings} = useSettings();

    return (
        <Box
            className={s.Container}
            style={{...getEmptyElementsThemeConfig(settings)}}
        >
            <style>
                {`
                 .css-1fjvggn-MuiPaper-root-MuiAccordion-root {
                 border: unset;
                 border-bottom: 1px solid ${hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)")}!important;
                 }
               `}
            </style>
            <SettingsContent settingsStyles={settings}/>
        </Box>
    )
}

export default SettingsContainerPage;