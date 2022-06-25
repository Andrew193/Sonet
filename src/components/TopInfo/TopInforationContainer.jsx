import LatestPosts from "./LatestPosts"
import s from "./top-info.module.css"
import {useEffect, useState} from "react";
import {getSettings} from "../../db";
import {hexToRgb} from "@mui/material";

function TopInfo() {
    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

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
                <span>© {(new Date()).getFullYear()} Sonet, Inc.</span>
            </aside>
        </>
    )
}

export default TopInfo;