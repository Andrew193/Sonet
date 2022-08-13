import {Box} from "@mui/material";
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
            }}
        >
            <style>
                {`
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