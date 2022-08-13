import {useContext, useEffect, useState} from "react";
import {getSettings} from "../db";
import s from "./fast-music.module.css";
import {alpha, Box, Tooltip, Typography} from "@mui/material";
import {BiUpArrowAlt, FiArrowDown} from "react-icons/all";
import React from "react"
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {headerListLinks} from "../vars";
import {MusicContext} from "../App";
import MusicContainerMemo from "./MusicContainer";

export const TooltipButtonCover = React.forwardRef(function MyComponent(props, ref) {
    return <div {...props} ref={ref} style={{display: "flex"}}>{props?.children}</div>
});

function FastMusicContainer() {
    const [settings, setSettings] = useState({});
    const [musicContext, setMusicContext] = useContext(MusicContext);
    const [isOpened, setIsOpened] = useState(false);
    const history = useHistory();
    const {t} = useTranslation();

    useEffect(() => {
        async function getData() {
            const response = await getSettings();
            setMusicContext((context) => ({
                ...context,
                tracks: response[0]?.music,
                tracksLength: response[0]?.music?.length,
                selectedTrack: null
            }))
            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <Box
            className={s.Container}
            style={{
                bottom: isOpened ? "0px" : "-400px",
                minWidth: isOpened ? "300px" : "50px"
            }}
        >
            <style>
                {`
                .${s.Container} {
                display: ${history?.location?.pathname === headerListLinks.auth ? "none" : "flex"}
                }
                .${s.Container} {
                box-shadow: 0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)} !important;
                }
                .${s.HeaderActions} svg:hover {
                background: ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)};
                }
                .${s.FastTrack} > svg:hover {
                  background: ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)};
                }
                .${s.Container} .chatBoxTop {
                height: 300px;
                }
                .${s.Container} .fromNow {
                width: max-content;
                }
                .${s.Container} .noConversationText {
                display: none;
                }
                .${s.Container} .messageText {
                text-align: left!important;
                padding-top:3px;
                padding-bottom: 25px;
                }
                @media (max-width: 1024px) {
                .fast_m_up {
                display: none;
                }
                .${s.Container} {
                min-width:300px};
                }
                }
                `}
            </style>
            <Typography
                component={"p"}
                className={s.Header}
            >
                <p
                    style={{
                        display: isOpened ? "block" : "none"
                    }}
                >Tracks</p>
                <span
                    className={s.HeaderActions}
                >
                    {
                        !isOpened
                            ? <Tooltip title={t("Expand")} arrow placement="top">
                                <TooltipButtonCover>
                                    <BiUpArrowAlt
                                        onClick={() => {
                                            setIsOpened(true)
                                        }}
                                    />
                                </TooltipButtonCover>
                            </Tooltip>
                            :
                            <Tooltip title={t("Collapse")} arrow placement="top">
                                <TooltipButtonCover>
                                    <FiArrowDown
                                        onClick={() => {
                                            setIsOpened(false)
                                        }}
                                    />
                                </TooltipButtonCover>
                            </Tooltip>
                    }
                </span>
            </Typography>
            <div
                style={{
                    overflow: "auto"
                }}
            >
                <MusicContainerMemo/>
            </div>
        </Box>
    )
}

export default FastMusicContainer;