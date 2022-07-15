import {alpha, Box, hexToRgb} from "@mui/material";
import {useEffect, useState} from "react";
import {getSettings} from "../db";
import s from "./gallery.module.css";
import GalleryInnerContent from "./GalleryInnerContent";
import {withRouter} from "react-router-dom";

function GalleryContainer() {
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
        >
            <style>
                {`
                 html, .chatBoxWrapper, .chatMenu, .chatMenuInput, .basicPageHead, .${s.ImagesContainer}, .${s.GalleryActions},
                 .${s.Container} {
                 background: ${settings?.configs?.background[settings?.background]};
                 }
                 .${s.GalleryActions} > svg:hover {
                 background: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "#7986cb"), 0.2)};
                 color: ${settings?.configs?.color[settings?.color]};
                 }
                 #ReactSimpleImageViewer img {
                 max-height: 550px !important;
                 min-height: 250px !important;
                 }
                `}
            </style>
            <GalleryInnerContent
                settings={settings}
            />
        </Box>
    )
}

export default withRouter(GalleryContainer);