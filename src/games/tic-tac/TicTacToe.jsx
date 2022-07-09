import React from 'react'
import {useState, useEffect} from "react"
import "./TicTacToe.css"
import {getSettings} from "../../db";
import {alpha, Typography} from "@mui/material";
import Tic from "../images/check+circle+icon-1320184982103223133.png";
import Tac from "../images/416-4167052_cross-sign-png-tic-tac-toe-cross-transparent.png";
import {buttonsConfig} from "../../createPost/CreatePostLine";
import {useTranslation} from "react-i18next";

const TicTacToe = () => {
    const [turn, setTurn] = useState('X')
    const [cells, setCells] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState()

    const [settings, setSettings] = useState({});

    const CheckWinner = (squares) => {
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6]
            ]
        }

        for (let combo in combos) {
            combos[combo].forEach((pattern) => {
                debugger
                if (
                    squares[pattern[0]]?.props?.alt === "" ||
                    squares[pattern[1]]?.props?.alt === "" ||
                    squares[pattern[2]]?.props?.alt === ""
                ) {

                } else if (squares[pattern[0]]?.props?.alt === squares[pattern[1]]?.props?.alt &&
                    squares[pattern[1]]?.props?.alt === squares[pattern[2]]?.props?.alt) {
                    setWinner(squares[pattern[0]]?.props?.alt)
                }
            })
        }
    }

    const handleClick = (num) => {
        if (cells[num] !== "") {
            return
        }
        let squares = [...cells]
        if (turn === "X" && winner === undefined) {
            squares[num] = <img src={Tac} alt={"X"}/>
            setTurn("O")
        } else if (winner === undefined) {
            squares[num] = <img src={Tic} alt={"O"}/>
            setTurn("X")
        }
        CheckWinner(squares)
        setCells(squares)
    };

    const Cell = ({num}) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>
    };

    const handleRestart = () => {
        setWinner(null)
        setCells(Array(9).fill(''))
    }

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    const {t} = useTranslation();

    return (
        <div className='container-tic'>
            <style>
                {`
                .table-back-tic {
                box-shadow: 0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "rgb(0,0,0)", 0.8)};
                background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(0,0,0)", 0.1)};
                }  
                .table-back-tic td{
                border: solid ${alpha(settings?.configs?.color[settings?.color] || "rgb(0,0,0)", 0.9)};
                color: black !important;
                }
                .table-back-tic td:hover{
                background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(0,0,0)", 0.4)} !important;
                }
                .table-back-tic td img{
                height: 50px;
                width: 50px; 
                }
                .labelTurn {
                   margin: 10px !important;
                   background: ${alpha(settings?.configs?.color[settings?.color] || "rgb(0,0,0)", 0.4)} !important;
                }
               `}
            </style>
            <div className='line-tic'>
                <h3
                    style={{
                        color: settings?.configs?.color[settings?.color],
                        fontSize: settings?.configs?.size[settings?.fontSize]
                    }}
                >{t("Just Play, Have Fun And Enjoy The Game")}</h3>
            </div>

            <div
                className={'table-back-tic'}
            >
                <table
                    className={'table-tic'}
                >
                    <tbody>
                    <tr>
                        <Cell num={0}/>
                        <Cell num={1}/>
                        <Cell num={2}/>
                    </tr>
                    <tr>
                        <Cell num={3}/>
                        <Cell num={4}/>
                        <Cell num={5}/>
                    </tr>
                    <tr>
                        <Cell num={6}/>
                        <Cell num={7}/>
                        <Cell num={8}/>
                    </tr>
                    </tbody>
                </table>
            </div>
            {winner && (
                <>
                    <h3 className='winner-tic'>{winner} {t("is the winner!")}</h3>
                    <span
                        id={'mainPostBtn'}
                        className={`btn-tic ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                        onClick={() => {
                            handleRestart();
                        }}
                    >{t("Start Again")}</span>
                </>
            )}
            <Typography
                style={{
                    fontSize: settings?.configs?.size[settings?.fontSize] || "16px",
                    padding: '1px 7px',
                    background: settings?.configs?.background[settings?.background] || "rgb(203, 203, 243)",
                    borderRadius: '5px',
                }}
                className={"labelTurn"}
            >
                {t("Now this is")} <span style={{color: "red"}}>{turn}</span> {t("turn")}
            </Typography>
        </div>
    )
}

export default TicTacToe