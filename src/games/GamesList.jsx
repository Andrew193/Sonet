import React from "react";
import {useMemo} from "react";
import GamePreviewTile from "./GamePreviewTile";
import Tic from "./images/tic.png";
import Image2048 from './images/2048.avif';
import Tetris from './images/tetris.png'
import {Box} from "@mui/material";
import GamesStyles from './games.module.css';

const gamesLisConfig = [
    {
        gameName: "Tic-Tac-Toe",
        icon: Tic,
        description: "Tic-tac-toe is a logical game between two opponents on a square field of 3 by 3 cells or larger. One of the players plays with \"crosses\", the second - with \"tac-toes\". The traditional Chinese game uses black and white stones.",
        keyPath: "/tic-tac-toe",
        altText: "Tic-Tac-Toe"
    },
    {
        gameName: "2048",
        icon: Image2048,
        description: '2048 is a browser game written by 19-year-old Italian developer Gabriele Cirulli in the JavaScript programming language. The playing field has the shape of a 4x4 square. The goal of the game is to get a tile with a face value of "2048". The game code is open and posted on the developer\'s page in GitHub.',
        keyPath: "/2048",
        altText: "Game 2048"
    },
    {
        gameName: "Tetris",
        icon: Tetris,
        description: 'Tetris is a computer game originally invented and developed by Soviet programmer Alexei Pajitnov. The game was released on June 6, 1984 - at that time Pajitnov worked at the Computing Center of the USSR Academy of Sciences.',
        keyPath: "/tetris",
        altText: "Tetris"
    }
]

function GamesList() {

    const games = useMemo(() => {
        return gamesLisConfig?.map((gameConfig, index) => <GamePreviewTile
            key={index}
            {...gameConfig}
        />)
    }, []);

    return (
        <Box
            m={2}
            className={GamesStyles.GamesTilesContainer}
        >
            {games}
        </Box>
    )
}

export default GamesList;