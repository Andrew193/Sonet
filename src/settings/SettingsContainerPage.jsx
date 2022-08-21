import {Box, hexToRgb} from "@mui/material";
import s from './settings.module.css';
import SettingsContent from "./SettingsContent";
import {useEffect, useState} from "react";
import {getSettings} from "../db";

function SettingsContainerPage() {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <Box
            className={s.Container}
            style={{
                background: settings?.configs?.background[settings?.background],
                borderRight: `1px solid ${hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)")}`,
            }}
        >
            <style>
                {`
                 .css-1fjvggn-MuiPaper-root-MuiAccordion-root {
                 border: unset;
                 border-bottom: 1px solid ${hexToRgb(settings?.configs?.color[settings?.color] || "rgb(231 231 240)")}!important;
                 }
                 html {
                 background: ${settings?.configs?.background[settings?.background]}
                 }
               `}
            </style>
            <SettingsContent
                settingsStyles={settings}
            />
        </Box>
    )
}

export default SettingsContainerPage;