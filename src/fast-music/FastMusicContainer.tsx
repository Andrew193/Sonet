import {useContext, useEffect, useState} from "react";
import {getSettings} from "../db";
import FastMusicStyles from "./fast-music.module.css";
import {alpha, Box, Tooltip, Typography} from "@mui/material";
import fastActionsStyles from "../fast-actions/fast-actions.module.css";
import {BiUpArrowAlt, FiArrowDown} from "react-icons/all";
import React from "react"
import {useTranslation} from "react-i18next";
import {MusicContext} from "../App";
import MusicContainerMemo from "./MusicContainer";
import {TooltipButtonCover} from "../components/tooltip-cover/TooltipButtonCover";
import {FastElementsPropsType} from "../fast-actions/FastActionsContainer";
import {useSettings} from "../hooks";

function FastMusicContainer(props: FastElementsPropsType) {
    const {
        opened,
        dropSelection
    } = props;

    const {settings} = useSettings();
    const [, setMusicContext] = useContext(MusicContext);
    const [isOpened, setIsOpened] = useState(false);
    const {t} = useTranslation();

    useEffect(() => {
        async function getData() {
            const response = await getSettings();
            setMusicContext((context: any) => ({
                ...context,
                tracks: response[0]?.music,
                tracksLength: response[0]?.music?.length,
                selectedTrack: null
            }))
        }

        getData();
    }, [])

    return (
        <Box
            className={FastMusicStyles.Container}
            style={{
                bottom: isOpened ? "0px" : "-400px",
                minWidth: isOpened ? "300px" : "50px",
                visibility: opened ? "visible" : "hidden"
            }}
        >
            {dropSelection}
            <style>
                {`
                .${FastMusicStyles.Container} {
                z-index:${opened ? "100" : "10"};
                }
                .${FastMusicStyles.Container} {
                box-shadow: 0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)} !important;
                }
                .${FastMusicStyles.HeaderActions} svg:hover {
                background: ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)};
                }
                 .${fastActionsStyles.ResetFastConfigButton}:hover {
                background: ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.5)};
                color: white;
                }
                .${FastMusicStyles.FastTrack}:hover {
                background: ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.5)};
                }
                .${FastMusicStyles.FastTrack}  svg:hover {
                  background: ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)};
                }
                .${FastMusicStyles.Container} .chatBoxTop {
                height: 300px;
                }
                .${FastMusicStyles.Container} .fromNow {
                width: max-content;
                }
                .${FastMusicStyles.Container} .noConversationText {
                display: none;
                }
                .${FastMusicStyles.Container} .messageText {
                text-align: left!important;
                padding-top:3px;
                padding-bottom: 25px;
                }
                @media (max-width: 1024px) {
                .fast_m_up {
                display: none;
                }
                .${FastMusicStyles.Header} > p {
                  display: ${isOpened ? "block!important" : "none"};
                }
                }
                `}
            </style>
            <Typography
                component={"p"}
                className={FastMusicStyles.Header}
            >
                <p>Tracks</p>
                <span className={FastMusicStyles.HeaderActions}>
                    {
                        !isOpened
                            ? <Tooltip title={t("Expand")} arrow placement="top">
                                <TooltipButtonCover>
                                    <BiUpArrowAlt onClick={() => setIsOpened(true)}/>
                                </TooltipButtonCover>
                            </Tooltip>
                            :
                            <Tooltip title={t("Collapse")} arrow placement="top">
                                <TooltipButtonCover>
                                    <FiArrowDown onClick={() => setIsOpened(false)}/>
                                </TooltipButtonCover>
                            </Tooltip>
                    }
                </span>
            </Typography>
            <div
                style={{
                    overflow: "auto",
                    height: "-webkit-fill-available"
                }}
            >
                <MusicContainerMemo/>
            </div>
        </Box>
    )
}

export default FastMusicContainer;