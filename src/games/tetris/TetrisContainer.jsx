import React from "react";
import Tetris from 'react-tetris';
import './tetris.css';
import {alpha, Box, Typography} from "@mui/material";
import {AiOutlineAlignCenter, AiOutlineArrowLeft, BiCoinStack} from "react-icons/all";
import {useState, useRef} from "react";
import {useOutsideClick, useSettings} from "../../hooks";
import {buttonsConfig} from "../../create-post/CreatePostLine";
import {useTranslation} from "react-i18next";
import {getElementsThemeConfig} from "../../utils";

function TetrisContainer() {
    const [isTipOpened, setIsTipOpened] = useState(false);
    const wrapperRef = useRef(null);
    const {t} = useTranslation();

    useOutsideClick(wrapperRef, () => {
        setIsTipOpened(false);
    })

    const {settings} = useSettings();

    return (
        <Box className={'tetris-container'}>
            <style>
                {`
                    .tetris-game-field {
                     background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)} !important;
                     color: ${settings?.configs?.color[settings?.color]};
                     font-weight: bold !important;
                     }
                     .tetris-tips-arrow svg:hover {
                     background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)};
                     }`}
            </style>
            <span className={'tetris-tips-arrow'}>
            <AiOutlineArrowLeft onClick={() => setIsTipOpened(() => true)}/>
            </span>
            <Tetris>
                {({
                      Gameboard,
                      PieceQueue,
                      points,
                      linesCleared,
                      state,
                      reset
                  }) => (
                    <div>
                        <div
                            style={{
                                marginRight: '10%',
                                marginLeft: '5%'
                            }}
                            className={"tetris-game-field"}
                        >
                            <div
                                style={{
                                    flexDirection: 'row',
                                    position: 'absolute',
                                    top: '-36px',
                                    left: '0px'
                                }}
                            >
                                <p>{t("Points:")} <BiCoinStack/><b>{points}</b></p>
                                <p>{t("Lines Cleared:")} <AiOutlineAlignCenter/><b>{linesCleared}</b></p>
                            </div>

                            {state === 'LOST' && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '-30px',
                                        right: '-35%',
                                    }}
                                >
                                    <span
                                        onClick={reset}
                                        id={'mainPostBtn'}
                                        className={`closeBtn-tetris ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                                    >{t("New game")}</span>
                                </div>
                            )}

                            <div>
                                <h4>{t("Game field")}</h4>
                                <Gameboard style={{background: 'red'}}/>
                            </div>
                        </div>

                        <div
                            style={{marginRight: '7%'}}
                            className={"tetris-game-field"}
                        >
                            <h4>{t("Next blocks")}</h4>
                            <PieceQueue/>
                        </div>

                        {isTipOpened && <div
                            className={'tetris-tips'}
                            ref={wrapperRef}
                            style={{
                                ...getElementsThemeConfig(settings),
                                backgroundColor: settings?.configs?.background[settings?.background],
                                color: settings?.configs?.color[settings?.color]
                            }}
                        >
                            <h4>{t("General Tips")}</h4>
                            <Typography
                                variant={'h5'}
                                component={'div'}
                            >1) {t("Memorize how pieces rotate clockwise and counterclockwise.")}</Typography>
                            <Typography
                                variant={'h5'}
                                component={'div'}
                            >2) {t("Look at your next piece while setting your current piece down")}</Typography>
                            <Typography
                                variant={'h5'}
                                component={'div'}
                            >3) {t("Play on marathon mode to learn the level progression")}</Typography>
                        </div>
                        }
                    </div>
                )}
            </Tetris>
        </Box>
    )
}

export default TetrisContainer;