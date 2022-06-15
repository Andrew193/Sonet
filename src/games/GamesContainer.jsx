import s from './games.module.css';
import {Box} from "@mui/material";
import GamesContent from "./GamesContent";

function GamesContainer() {


    return (
        <Box
            className={s.Container}
        >
            <GamesContent/>
            <div className={s.Fixer} />
        </Box>
    )
}

export default GamesContainer;