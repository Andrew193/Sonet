import LatestPosts from "./LatestPosts"
import s from "./top-info.module.css"
import {hexToRgb} from "@mui/material";
import {useSettings} from "../../hooks";
import TopUsers from "./TopUsers";
import React from "react";

function TopInfo() {
    const {settings} = useSettings();

    return (
        <>
            <style>
                {`
                .${s.Container} {
                   background: ${hexToRgb(settings?.configs?.background[settings?.background] || "rgb(231 231 240)")}
                }
                `}
            </style>
            <aside className={s.Container}>
                <LatestPosts/>
                <TopUsers/>
                <span>© {(new Date()).getFullYear()} Sonet, Inc.</span>
            </aside>
        </>
    )
}

export default TopInfo;