import {Typography} from "@mui/material";
import GamesList from "./GamesList";
import withPageHeader from "../hoc/withPageHeader";
import {withRouter} from "react-router-dom";
import {useMemo} from "react";
import TicTacToe from "./tic-tac/TicTacToe";
import Game2048Container from "./2048/Game2048Container";
import TetrisContainer from "./tetris/TetrisContainer";

function getSelectedGame(game) {
    return {
        "tic-tac-toe": TicTacToe,
        "2048": Game2048Container,
        "tetris": TetrisContainer
    }[game]
}

function GamesContent(props) {
    const {
        match,
        styleSettings
    } = props;

    const Game = useMemo(() => {
        if (match?.params?.gameType) {
            const Component = getSelectedGame(match?.params?.gameType);

            return Component;
        }
    }, [match])

    return (
        <>
            {
                !!Game
                    ? <Game/>
                    : <>
                        <Typography
                            variant={'h4'}
                            component={'h4'}
                            style={{
                                margin: '10px',
                                fontSize: styleSettings?.configs?.size[styleSettings?.fontSize],
                                fontWeight:"bold"
                            }}
                        >Choose a game</Typography>

                        <GamesList
                            styleSettings={styleSettings}
                        />
                    </>
            }
        </>
    )
}

export default withRouter(withPageHeader(GamesContent, {path: "/games", Title: "Games"}));