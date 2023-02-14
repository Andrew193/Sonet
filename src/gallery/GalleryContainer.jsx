import React from "react";
import {alpha, Box, hexToRgb} from "@mui/material";
import GalleryStyles from "./gallery.module.css";
import GalleryInnerContent from "./GalleryInnerContent";
import {withRouter} from "react-router-dom";
import {useSettings} from "../hooks";
import {getEmptyElementsThemeConfig} from "../utils";

function GalleryContainer() {
    const {settings} = useSettings();

    return (
        <Box className={GalleryStyles.Container} style={getEmptyElementsThemeConfig(settings)}>
            <style>
                {`
                 html, .chatBoxWrapper, .chatMenu, .chatMenuInput, .basicPageHead, .${GalleryStyles.ImagesContainer}, .${GalleryStyles.GalleryActions} {
                 background: ${settings?.configs?.background[settings?.background]};
                 }
                 .${GalleryStyles.GalleryActions} > svg:hover {
                 background: ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "#7986cb"), 0.2)};
                 color: ${settings?.configs?.color[settings?.color]};
                 }
                 #ReactSimpleImageViewer img {
                 max-height: 550px !important;
                 min-height: 250px !important;
                 }
                `}
            </style>
            <GalleryInnerContent settings={settings}/>
        </Box>
    )
}

export default withRouter(GalleryContainer);