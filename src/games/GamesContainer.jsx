import s from './games.module.css';
import {Box} from "@mui/material";
import GamesContent from "./GamesContent";
import {useEffect, useState} from "react";
import {getSettings} from "../db";
import {useLocation, withRouter} from "react-router-dom";

function GamesContainer() {
    const location = useLocation();

    const gameType = location?.pathname?.split("/")[2]

    const [settings, setSettings] = useState({});

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <Box
            className={s.Container}
            style={{
                background: settings?.configs?.background[settings?.background],
                height: `${!!gameType ? "-webkit-fill-available" : "unset"}`
            }}
        >
            <GamesContent
                styleSettings={settings}
            />
            <div className={s.Fixer}/>
        </Box>
    )
}

export default withRouter(GamesContainer);