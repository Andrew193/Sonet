import s from "./gallery.module.css";
import {Typography} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";


function GalleryMode() {
    const [selected, setSelected] = useState(0);

    const {t} = useTranslation();

    return (
        <Typography
            className={s.Navigation}
        >
            <span
                id={"mainPostBtn"}
                style={{background: !selected ? "red" : ""}}
                onClick={() => {
                    setSelected(0)
                }}
            >
                {t("All")}
            </span>
            <span
                id={"mainPostBtn"}
                style={{background: !!selected ? "red" : ""}}
                onClick={() => {
                    setSelected(1)
                }}
            >
                {t("Folders")}
            </span>
        </Typography>
    )
}

export default GalleryMode;