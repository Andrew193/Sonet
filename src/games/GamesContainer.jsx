import s from './games.module.css';
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
            className={s.Container}
            style={{
                ...getEmptyElementsThemeConfig(settings),
                height: `${!!gameType ? "-webkit-fill-available" : "unset"}`
            }}
        >
            <GamesContent styleSettings={settings}/>
            <div className={s.Fixer}/>
        </Box>
    )
}

export default withRouter(GamesContainer);