import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {alpha, Box, Tooltip, Typography} from "@mui/material";
import s from "./fast-actions.module.css";
import {headerListLinks} from "../vars";
import {AiOutlineStar, BiUpArrowAlt, BsChatDots, FiArrowDown, MdQueueMusic} from "react-icons/all";
import {TooltipButtonCover} from "../fastMusic/FastMusicContainer";
import {useSettings} from "../hooks";
import Components from "../components";

const fastEntities = {
    music: 1,
    messages: 2
}

function FastActionsContainer() {
    const settingsConfig = useSettings();
    const [isOpened, setIsOpened] = useState(false);
    const history = useHistory();
    const [selectedMode, setSelectedMode] = useState(0)
    const {t} = useTranslation();

    useEffect(() => {
        setIsOpened(false);
    }, [selectedMode])

    console.log(settingsConfig)
    return (
        <>
            <Box
                className={s.Container}
                style={{
                    bottom: isOpened ? "0px" : "-400px",
                    minWidth: isOpened ? "300px" : "50px",
                    visibility: selectedMode !== 0 ? "hidden" : "visible"
                }}
            >
                <style>
                    {`
                .${s.Container} {
                display: ${history?.location?.pathname === headerListLinks.auth ? "none" : "flex"};
                z-index:${selectedMode === 0 ? "100" : "10"};
                }
                .${s.Container} {
                box-shadow: 0px 0px 8px 0px ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.8)} !important;
                }
                .${s.HeaderActions} svg:hover {
                background: ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.8)};
                }
                .${s.Container} .chatBoxTop {
                height: 300px;
                }
                .${s.Container} .fromNow {
                width: max-content;
                }
                @media (max-width: 1024px) {
                .fast_m_up {
                display: none;
                }
                .${s.FastElement}:hover {
                background: ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.5)};
                }
                .${s.Header} > p {
                  display: ${isOpened ? "block!important" : "none"};
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
                    <p>Fast actions</p>
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
                <Box>
                    <ul>
                        <li
                            className={s.FastElement}
                            onClick={() => setSelectedMode(fastEntities.music)}
                        >
                            <MdQueueMusic/>
                            Fast Music
                        </li>
                        <li
                            className={s.FastElement}
                            onClick={() => setSelectedMode(fastEntities.messages)}
                        >
                            <BsChatDots/>
                            Fast Messages
                        </li>
                    </ul>
                </Box>
            </Box>
            <Components.FastMusicContainer
                opened={selectedMode === fastEntities.music}
                dropSelection={<AiOutlineStar
                    onClick={() => {
                        setSelectedMode(0)
                    }}
                    className={s.ResetFastConfigButton}
                />}
            />
            <Components.FastMessageContainer
                opened={selectedMode === fastEntities.messages}
                dropSelection={<AiOutlineStar
                    onClick={() => {
                        setSelectedMode(0)
                    }}
                    className={s.ResetFastConfigButton}
                />}
            />
        </>
    )
}

export default FastActionsContainer;