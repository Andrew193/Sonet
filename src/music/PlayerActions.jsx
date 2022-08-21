import {buttonsConfig} from "../create-post/CreatePostLine";
import {alpha, Box, hexToRgb} from "@mui/material";
import {useTranslation} from "react-i18next";
import s from "./music.module.css";

function PlayerActions(props) {
    const {
        color,
        createNewSong,
        dropPreviewMusic
    } = props;

    const {t} = useTranslation();

    return (
        <Box
            className={s.PlayerActions}
        >
            <style>{`
            .${s.Track} {
             background:${alpha(hexToRgb(color || "#ffffff"), 0.5)}
            }
            `}</style>
            <span
                style={{
                    background: `${alpha(hexToRgb(color || "#ffffff"), 0.5)}`
                }}
                onClick={() => createNewSong()}
            >
                {t("Add to my collection")}
            </span>

            <span
                style={{
                    background: `${alpha(hexToRgb(color || "#ffffff"), 0.5)}`
                }}
                onClick={() => dropPreviewMusic()}
            >
                {t("Delete")}
            </span>
        </Box>
    )
}

export default PlayerActions;