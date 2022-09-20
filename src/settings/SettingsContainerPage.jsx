import {Box, hexToRgb} from "@mui/material";
import s from './settings.module.css';
import SettingsContent from "./SettingsContent";
import {useSettings} from "../hooks";

function SettingsContainerPage() {
    const {settings} = useSettings();

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
            <SettingsContent settingsStyles={settings}/>
        </Box>
    )
}

export default SettingsContainerPage;