import Tetris from 'react-tetris';
import './tetris.css';
import {alpha, Box, Typography} from "@mui/material";
import {AiOutlineAlignCenter, AiOutlineArrowLeft, BiCoinStack} from "react-icons/all";
import {useState, useEffect, useRef} from "react";
import {useOutsideClick} from "../../hooks";
import {getSettings} from "../../db";
import {buttonsConfig} from "../../createPost/CreatePostLine";

function TetrisContainer() {
    const [isTipOpened, setIsTipOpened] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        setIsTipOpened(false);
    })

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
            className={'tetris-container'}
        >
            <style>
                {`
                    .tetris-game-field {
                     background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)} !important;
                     color: ${settings?.configs?.color[settings?.color]};
                     font-weight: bold !important;
                     }
                     
                     @keyframes pulse {
                     0% {
                     -moz-box-shadow: 0 0 0 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     box-shadow: 0 0 5px 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     }
                     70% {
                     -moz-box-shadow: 0 0 0 5px ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     box-shadow: 0 0 5px 5px ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     }
                     100% {
                     -moz-box-shadow: 0 0 0 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     box-shadow: 0 0 5px 0 ${settings?.configs?.color[settings?.color] || "rgb(79, 141, 255)"};
                     }
                     }
                     .tetris-tips-arrow svg:hover {
                     background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)",0.5)};
                     }`}
            </style>
            <span className={'tetris-tips-arrow'}>
            <AiOutlineArrowLeft
                onClick={() => {
                    setIsTipOpened((state) => true)
                }}
            />
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
                                <p>Points: <BiCoinStack/><b>{points}</b></p>
                                <p>Lines Cleared: <AiOutlineAlignCenter/><b>{linesCleared}</b></p>
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
                                    >New game</span>
                                </div>
                            )}

                            <div>
                                <h4>Game field</h4>
                                <Gameboard
                                    style={{background: 'red'}}
                                />
                            </div>
                        </div>

                        <div
                            style={{marginRight: '7%'}}
                            className={"tetris-game-field"}
                        >
                            <h4>Next blocks</h4>
                            <PieceQueue/>
                        </div>

                        {isTipOpened && <div
                            className={'tetris-tips'}
                            ref={wrapperRef}
                            style={{
                                boxShadow: `0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "rgb(0,0,0)", 0.8)}`,
                                backgroundColor: settings?.configs?.background[settings?.background],
                                color: settings?.configs?.color[settings?.color]
                            }}
                        >
                            <h4>General Tips</h4>
                            <Typography
                                variant={'h5'}
                                component={'div'}
                            >1) Memorize how pieces rotate clockwise and counterclockwise.</Typography>
                            <Typography
                                variant={'h5'}
                                component={'div'}
                            >2) Look at your next piece while setting your current piece down</Typography>
                            <Typography
                                variant={'h5'}
                                component={'div'}
                            >3) Play on marathon mode to learn the level progression</Typography>
                        </div>
                        }
                    </div>
                )}
            </Tetris>
        </Box>
    )
}

export default TetrisContainer;