import Tetris from 'react-tetris';
import './tetris.css';
import {Box, Typography} from "@mui/material";
import {AiOutlineAlignCenter, AiOutlineArrowLeft, BiCoinStack} from "react-icons/all";
import {useState} from "react";
import {useOutsideClick} from "../../hooks";
import {useRef} from "react";

function TetrisContainer() {
    const [isTipOpened, setIsTipOpened] = useState(false);
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        setIsTipOpened(false);
    })
    return (
        <Box
            className={'tetris-container'}
        >
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
                                        right: '-35%'
                                    }}
                                >
                                    <span
                                        onClick={reset}
                                        id={'mainPostBtn'}
                                        className={'closeBtn-tetris'}
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
                        >
                            <h4>Next blocks</h4>
                            <PieceQueue/>
                        </div>

                        {isTipOpened && <div
                            className={'tetris-tips'}
                            ref={wrapperRef}
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