import LatestPosts from "./LatestPosts"
import AsideBarStyles from "./aside-bar.module.css"
import {hexToRgb} from "@mui/material";
import {useSettings} from "../../hooks";
import LatestUsers from "./LatestUsers";
import React from "react";

function AsideBar() {
    const {settings} = useSettings();

    return (
        <>
            <style>
                {`
                .${AsideBarStyles.Container} {
                   background: ${hexToRgb(settings?.configs?.background[settings?.background] || "rgb(231 231 240)")}
                }
                `}
            </style>
            <aside className={AsideBarStyles.Container}>
                <LatestPosts/>
                <LatestUsers/>
                <span>© {(new Date()).getFullYear()} Sonet, Inc.</span>
            </aside>
        </>
    )
}

export default AsideBar;