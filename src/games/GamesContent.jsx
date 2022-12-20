import React from "react";
import {Typography} from "@mui/material";
import GamesList from "./GamesList";
import withPageHeader from "../hoc/withPageHeader";
import {withRouter} from "react-router-dom";
import {useMemo} from "react";
import TicTacToe from "./tic-tac/TicTacToe";
import Game2048Container from "./2048/Game2048Container";
import TetrisContainer from "./tetris/TetrisContainer";
import {useTranslation} from "react-i18next";
import PropTypes from "prop-types";

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
            return getSelectedGame(match?.params?.gameType);
        }
    }, [match])

    const {t} = useTranslation();

    return (
        <>
            {
                Game
                    ? <Game/>
                    : <>
                        <Typography
                            variant={'h4'}
                            component={'h4'}
                            style={{
                                margin: '10px',
                                fontWeight: "bold"
                            }}
                        >{t("Choose a game")}</Typography>

                        <GamesList styleSettings={styleSettings}/>
                    </>
            }
        </>
    )
}

GamesContent.propTypes = {
    match: PropTypes.object,
    styleSettings: PropTypes.object
}

export default withRouter(withPageHeader(GamesContent, {path: "/games", Title: "Games"}));
