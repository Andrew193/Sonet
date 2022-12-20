import "./2048.css";
import React from "react";
import {useEffect, useState} from "react";
import {ImStarEmpty} from "react-icons/all";
import {getSettings} from "../../db";
import {alpha, hexToRgb as muiHexToRgb} from "@mui/material"
import {useTranslation} from "react-i18next";

let mydata = [];    // Добавляем атрибут mydata для хранения игровых данных
let score = 0;	  	   // Добавляем атрибут оценки
let gameover = 0;	    // Добавляем состояние в конце игры
let gamerrunning = 1;	     // Добавляем состояние, когда игра запущена
let status = 1;		      // Добавляем состояние игры

function start() {      // Устанавливаем метод при запуске игры
    status = gamerrunning;
    score = 0;
    mydata = [];
    for (let r = 0; r < 4; r++) {  // Добавьте число 0 к переменной цикла массива mydata, чтобы сделать его двумерным массивом
        mydata[r] = [];
        for (let c = 0; c < 4; c++) {
            mydata[r][c] = 0;
        }
    }
    randomNum();    // Число 2/4 генерируется случайным образом в начале игры
    randomNum();
    dataView();     // Выполняем функцию dataView, когда игра начинает передавать обновление данных на страницу, обновляем данные на странице
}

function randomNum() {       // Метод генерации случайных чисел и присвоения начального случайного числа mydata
    for (; ;) {                     // Циклу for здесь нельзя задать фиксированное условие, потому что конечное условие не может быть известно, когда игра запущена, и он может работать только последовательно
        let r = Math.floor(Math.random() * 4);      // Задаем случайную величину и пусть это будет координата, в которой число появляется случайным образом
        let c = Math.floor(Math.random() * 4);
        if (mydata[r][c] === 0) {               // Если значение в текущей координате в данных равно 0 или пусто, вставляем случайное число 2 или 4
            // Установленное случайное число 2 или 4 имеет одинаковый шанс выпадения, наполовину открыто
            mydata[r][c] = Math.random() > 0.5 ? 2 : 4;
            break;
        }
    }
}

function dataView() {      // Метод передачи данных на страницу и контроль смены стиля
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let div = document.getElementById("c" + r + c);
            if (mydata[r][c] === 0) {
                div.innerHTML = "";
                div.className = "cell-2048";
            } else {
                div.innerHTML = mydata[r][c];
                div.className = 'cell-2048 n' + mydata[r][c];
            }
        }
    }

    document.getElementById('score01-2048').innerHTML = score;
    if (status === gameover) {
        document.getElementById('score02-2048').innerHTML = score;
        document.getElementById('gameover-2048').style.display = 'block';
    } else {
        document.getElementById('gameover-2048').style.display = 'none';
    }
}

function isgameover() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (mydata[r][c] === 0) {
                return false;
            }
            if (c < 3) {
                if (mydata[r][c] === mydata[r][c + 1]) {
                    return false;
                }
            }
            if (r < 3) {
                if (mydata[r][c] === mydata[r + 1][c]) {
                    return false;
                }
            }
        }
    }
    return true;
}

//Движение влево
function moveLeft() {
    let before = String(mydata);
    for (let r = 0; r < 4; r++) {
        moveLeftInRow(r);
    }
    let after = String(mydata);
    if (before !== after) {
        randomNum();
        if (isgameover()) {
            status = gameover;
        }
        dataView();
    }
}

function moveLeftInRow(r) {
    for (let c = 0; c < 3; c++) {
        let nextc = getNEXTinRow(r, c);
        if (nextc !== -1) {
            if (mydata[r][c] === 0) {
                mydata[r][c] = mydata[r][nextc];
                mydata[r][nextc] = 0;
                c--;
            } else if (mydata[r][c] === mydata[r][nextc]) {
                mydata[r][c] *= 2;
                mydata[r][nextc] = 0;
                score += mydata[r][c];
            }
        } else {
            break;
        }
    }
}

function getNEXTinRow(r, c) {
    for (let i = c + 1; i < 4; i++) {
        if (mydata[r][i] !== 0) {
            return i;
        }
    }
    return -1;
}

//Переместить вправо
function moveRight() {
    let before = String(mydata);
    for (let r = 0; r < 4; r++) {
        moveRightInRow(r);
    }
    let after = String(mydata);
    if (before !== after) {
        randomNum();
        if (isgameover()) {
            status = gameover;
        }
        dataView();
    }
}

function moveRightInRow(r) {
    for (let c = 3; c > 0; c--) {
        let nextc = RightgetNEXTinRow(r, c);
        if (nextc !== -1) {
            if (mydata[r][c] === 0) {
                mydata[r][c] = mydata[r][nextc];
                mydata[r][nextc] = 0;
                c++;
            } else if (mydata[r][c] === mydata[r][nextc]) {
                mydata[r][c] *= 2;
                mydata[r][nextc] = 0;
                score += mydata[r][c];
            }
        } else {
            break;
        }
    }
}

function RightgetNEXTinRow(r, c) {
    for (let i = c - 1; i >= 0; i--) {
        if (mydata[r][i] !== 0) {
            return i;
        }
    }
    return -1;
}

// Двигаться вверх
function moveTop() {
    let before = String(mydata);
    for (let r = 0; r < 4; r++) {
        moveTopInRow(r);
    }
    let after = String(mydata);
    if (before !== after) {
        randomNum();
        if (isgameover()) {
            status = gameover;
        }
        dataView();
    }
}

function moveTopInRow(r) {
    for (let c = 0; c < 3; c++) {
        let nextc = TopgetNEXTinRow(r, c);
        if (nextc !== -1) {
            if (mydata[c][r] === 0) {
                mydata[c][r] = mydata[nextc][r];
                mydata[nextc][r] = 0;
                c++;
            } else if (mydata[c][r] === mydata[nextc][r]) {
                mydata[c][r] *= 2;
                mydata[nextc][r] = 0;
                score += mydata[c][r];
            }
        } else {
            break;
        }
    }
}

function TopgetNEXTinRow(r, c) {
    for (let i = c + 1; i < 4; i++) {
        if (mydata[i][r] !== 0) {
            return i;
        }
    }
    return -1;
}

// двигаться вниз
function moveBottom() {
    let before = String(mydata);
    for (let r = 0; r < 4; r++) {
        moveBottomInRow(r);
    }
    let after = String(mydata);
    if (before !== after) {
        randomNum();
        if (isgameover()) {
            status = gameover;
        }
        dataView();
    }
}

function BottomgetNEXTinRow(r, c) {
    for (var i = c - 1; i >= 0; i--) {
        if (mydata[i][r] !== 0) {
            return i;
        }
    }
    return -1;
}

function moveBottomInRow(r) {
    for (let c = 3; c > 0; c--) {
        let nextc = BottomgetNEXTinRow(r, c);
        if (nextc !== -1) {
            if (mydata[c][r] === 0) {
                mydata[c][r] = mydata[nextc][r];
                mydata[nextc][r] = 0;
                c++;
            } else if (mydata[c][r] === mydata[nextc][r]) {
                mydata[c][r] *= 2;
                mydata[nextc][r] = 0;
                score += mydata[c][r];
            }
        } else {
            break;
        }
    }
}

function Game2048Container() {
    const [highestTileCost, setHighestTileCost] = useState(0);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        document.onkeydown = function (e) {
            let event = e || arguments[0];

            if (event.keyCode === 37) {
                moveLeft();
            } else if (event.keyCode === 38) {
                moveTop();
            } else if (event.keyCode === 39) {
                moveRight();
            } else if (event.keyCode === 40) {
                moveBottom();
            }

            setHighestTileCost(() => Math.max(...mydata?.flat()))
        }


// Следующий код предназначен для обработки совместимости этой игры путем ее упаковки в режим приложения,
        let startX, startY, endX, endY;    // Определение четырех переменных для хранения значений по оси X и оси Y при касании и при выходе из касания

        const touchStartHandler = function (e) {  // Связывание события слушателя при начале касания пальцем
            let event = e || arguments[0];

            startX = event.touches[0].pageX;
            startY = event.touches[0].pageY;
        }
        document.addEventListener("touchstart", touchStartHandler)

        const touchedEndHandler = function (e) {    // Привязка события прослушивания, когда палец касается и уходит
            let event = e || arguments[0];

            endX = event.changedTouches[0].pageX;
            endY = event.changedTouches[0].pageY;

            let x = endX - startX;
            let y = endY - startY;

            let absX = Math.abs(x) > Math.abs(y);
            let absY = Math.abs(y) > Math.abs(x);

            if (x > 0 && absX) {
                moveRight();
            } else if (x < 0 && absX) {
                moveLeft();
            } else if (y > 0 && absY) {
                moveBottom();
            } else if (y < 0 && absY) {
                moveTop();
            }

        }

        document.addEventListener("touchend", touchedEndHandler)

        start();

        return () => {
            document.onkeydown = () => {
                //spare
            }
        }
    }, [])

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    const {t} = useTranslation();

    return (
        <div className="marg-2048">
            <style>
                {`
                    .actionBtn2048 {
                     background: ${settings?.configs?.color[settings?.color]} !important;
                     }
                     
                     .cell-2048:hover {
                      background: ${settings?.configs?.color[settings?.color]} !important;
                     }
                     
                     .actionBtn2048:hover {
                        background: ${alpha(muiHexToRgb(settings?.configs?.color[settings?.color] || "red"), 0.5)} !important;
                     }
                     
                     .score2048{
                      color: ${settings?.configs?.color[settings?.color]} !important;
                     }
                `}
            </style>

            <div className={'stat-2048'}>
                <div className={'logo-2048'}>2048</div>
                <div className={'actions-2048'}>
                    <span
                        id={`mainPostBtn`}
                        className={'btn-new-2048 actionBtn2048'}
                        onClick={() => {
                            start();
                        }}
                    >{t("New")}</span>
                    <p>
                        {t("SCORE:")}
                        <ImStarEmpty
                            className={"score2048"}
                        />
                        <span id="score01-2048">0</span>
                    </p>
                </div>
                <div
                    style={{width: '175px'}}
                >
                    <p>
                        <span style={{color: 'white'}}>{t("Highest match:")}</span>
                        <ImStarEmpty
                            className={"score2048"}
                        />
                        <span>{highestTileCost}</span>
                    </p>
                </div>
            </div>
            <div className="main-2048">
                <div className="cell-2048" id="c00"/>
                <div className="cell-2048" id="c01"/>
                <div className="cell-2048" id="c02"/>
                <div className="cell-2048" id="c03"/>

                <div className="cell-2048" id="c10"/>
                <div className="cell-2048" id="c11"/>
                <div className="cell-2048" id="c12"/>
                <div className="cell-2048" id="c13"/>

                <div className="cell-2048" id="c20"/>
                <div className="cell-2048" id="c21"/>
                <div className="cell-2048" id="c22"/>
                <div className="cell-2048" id="c23"/>

                <div className="cell-2048" id="c30"/>
                <div className="cell-2048" id="c31"/>
                <div className="cell-2048" id="c32"/>
                <div className="cell-2048" id="c33"/>
            </div>
            <div className="gameover-2048" id="gameover-2048">
                <div className="over-2048">
                    <p>{t("GAME OVER :(")}</p>
                    <p>{t("SCORE:")}<span id="score02-2048"/></p>
                    <span
                        id={'test'}
                        onClick={() => {
                            start();
                        }}
                    >{t("Try again!")}</span>
                </div>
            </div>
        </div>
    )
}

export default Game2048Container;