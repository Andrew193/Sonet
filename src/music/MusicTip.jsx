import {Typography} from "@mui/material";
import {MdMusicNote} from "react-icons/all";
import s from "./music.module.css";
import {useEffect, useState} from "react";
import React from "react";

function MusicTip() {
    const [shouldTransform, setShouldTransform] = useState(false);
    const [shouldHide, setShouldHide] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShouldTransform(() => true);
            clearTimeout(timeout);
            const innerTimeout = setTimeout(() => {
                setShouldHide(() => true)
                clearTimeout(innerTimeout);
            }, 200)
        }, 3000)

    }, [])

    return (
        <>
            <div
                className={`${s.MusicTip} ${!shouldTransform ? "" : s.HideTipTransform} ${!shouldHide ? "" : s.HideTipFully}`}
            >
                <Typography
                    component={"h4"}
                    variant={"h4"}
                >
                    Keep in mind that all your music is stored locally.
                </Typography>
                <MdMusicNote/>
            </div>
        </>
    )
}

export default MusicTip;