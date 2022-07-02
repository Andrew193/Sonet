import {alpha} from "@mui/material";
import {useEffect, useState} from "@types/react";
import {getSettings} from "../db";


function GalleryContainer() {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return(
        <>
            <style>
                {`
                .chatMenuInput {
                 border-bottom: 1px solid ${settings?.configs?.color[settings?.color]};
                 }
                 .chatMenuWrapper {
                 border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                 }
                 .conversation:hover {
                 color: ${settings?.configs?.color[settings?.color]};
                 background: ${alpha(settings?.configs?.color[settings?.color] || "#7986cb", 0.7)};
                 }
                 html, .chatBoxWrapper, .chatMenu, .chatMenuInput{
                 background: ${settings?.configs?.background[settings?.background]};
                 }
                 .noConversationText, .lonelyLine{
                 color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(224, 220, 220)", 0.5)} !important;
                 }
                `}
            </style>
        </>
    )
}

export default GalleryContainer;