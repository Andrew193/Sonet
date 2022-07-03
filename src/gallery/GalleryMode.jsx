import s from "./gallery.module.css";
import {Typography} from "@mui/material";
import {useState} from "react";


function GalleryMode() {
    const [selected, setSelected] = useState(0);

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
                All</span>
            <span
                id={"mainPostBtn"}
                style={{background: !!selected ? "red" : ""}}
                onClick={() => {
                    setSelected(1)
                }}
            >
                Folders</span>
        </Typography>
    )
}

export default GalleryMode;