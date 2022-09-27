import {alpha, Box, hexToRgb} from "@mui/material";
import s from "./gallery.module.css";
import GalleryInnerContent from "./GalleryInnerContent";
import {withRouter} from "react-router-dom";
import {useSettings} from "../hooks";
import {getEmptyElementsThemeConfig} from "../utils";

function GalleryContainer() {
    const {settings} = useSettings();

    return (
        <Box className={s.Container} style={getEmptyElementsThemeConfig(settings)}>
            <style>
                {`
                 html, .chatBoxWrapper, .chatMenu, .chatMenuInput, .basicPageHead, .${s.ImagesContainer}, .${s.GalleryActions} {
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