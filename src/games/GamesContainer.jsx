import React from "react";
import GamesStyles from './games.module.css';
import {Box} from "@mui/material";
import GamesContent from "./GamesContent";
import {useLocation, withRouter} from "react-router-dom";
import {useSettings} from "../hooks";
import {getEmptyElementsThemeConfig} from "../utils";

function GamesContainer() {
    const location = useLocation();
    const gameType = location?.pathname?.split("/")[2]
    const {settings} = useSettings();

    return (
        <Box
            className={GamesStyles.Container}
            style={{
                ...getEmptyElementsThemeConfig(settings),
                height: `${gameType ? "-webkit-fill-available" : "fit-content"}`
            }}
        >
            <GamesContent/>
            <div className={GamesStyles.Fixer}/>
        </Box>
    )
}

export default withRouter(GamesContainer);