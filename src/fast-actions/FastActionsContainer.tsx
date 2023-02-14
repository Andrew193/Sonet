import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {alpha, Box, Tooltip, Typography} from "@mui/material";
import FastActionsStyles from "./fast-actions.module.css";
import {headerListLinks} from "../vars";
import {AiOutlineStar, BiUpArrowAlt, BsChatDots, FiArrowDown, MdQueueMusic} from "react-icons/all";
import {useSettings} from "../hooks";
import Components from "../components";
import {TooltipButtonCover} from "../components/tooltip-cover/TooltipButtonCover";

type FastEntitiesInterface = {
    music: number;
    messages: number;
}

export type FastElementsPropsType = {
    opened: boolean,
    dropSelection: React.ReactNode
}

const fastEntities: FastEntitiesInterface = {
    music: 1,
    messages: 2
}

export const getFastDisplay = (history: any) => history?.location?.pathname === headerListLinks.chats
|| history?.location?.pathname === headerListLinks.auth
|| history?.location?.pathname === headerListLinks.music ? "none" : "flex"

function FastActionsContainer() {
    const settingsConfig = useSettings();
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [selectedMode, setSelectedMode] = useState<number>(0)
    const {t} = useTranslation();

    useEffect(() => {
        setIsOpened(false);
    }, [selectedMode])

    return (
        <>
            <Box
                className={FastActionsStyles.Container}
                style={{
                    bottom: isOpened ? "0px" : "-400px",
                    minWidth: isOpened ? "300px" : "50px",
                    visibility: selectedMode !== 0 ? "hidden" : "visible"
                }}
            >
                <style>
                    {`
                .${FastActionsStyles.Container} {
                z-index:${selectedMode === 0 ? "100" : "10"};
                }
                .${FastActionsStyles.Container} {
                box-shadow: 0px 0px 8px 0px ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.8)} !important;
                }
                .${FastActionsStyles.HeaderActions} svg:hover {
                background: ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.8)};
                }
                .${FastActionsStyles.Container} .chatBoxTop {
                height: 300px;
                }
                .${FastActionsStyles.Container} .fromNow {
                width: max-content;
                }
                @media (max-width: 1024px) {
                .fast_m_up {
                display: none;
                }
                .${FastActionsStyles.FastElement}:hover {
                background: ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.5)};
                }
                .${FastActionsStyles.Header} > .p {
                  display: ${isOpened ? "block!important" : "none"};
                }
                .${FastActionsStyles.Container} {
                min-width:300px};
                }
                }
                `}
                </style>
                <Typography
                    component={"p"}
                    className={FastActionsStyles.Header}
                >
                    <span className={"p"}>Fast actions</span>
                    <span className={FastActionsStyles.HeaderActions}>
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
                <Box>
                    <ul>
                        <li
                            className={FastActionsStyles.FastElement}
                            onClick={() => setSelectedMode(fastEntities.music)}
                        >
                            <MdQueueMusic/>
                            Fast Music
                        </li>
                        <li
                            className={FastActionsStyles.FastElement}
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
                    onClick={() => setSelectedMode(0)}
                    className={FastActionsStyles.ResetFastConfigButton}
                />}
            />
            <Components.FastMessageContainer
                opened={selectedMode === fastEntities.messages}
                dropSelection={<AiOutlineStar
                    onClick={() => setSelectedMode(0)}
                    className={FastActionsStyles.ResetFastConfigButton}
                />}
            />
        </>
    )
}

export default FastActionsContainer;