import {useState} from "react";
import s from "./fast-message.module.css";
import {alpha, Box, Tooltip, Typography} from "@mui/material";
import {BiMessageRoundedDots, BiUpArrowAlt, FiArrowDown} from "react-icons/all";
import React from "react"
import {useTranslation} from "react-i18next";
import FriendsContainer from "./FriendsContainer";
import {useHistory} from "react-router-dom";
import {headerListLinks} from "../vars";
import {TooltipButtonCover} from "../components/tooltip-cover/TooltipButtonCover";
import {useSettings} from "../hooks";
import {FastElementsPropsType} from "../fast-actions/FastActionsContainer";

export type ConversationType = {
    approved: boolean
    createdAt: string
    id: number
    receiverId: number
    receiverName: string
    requestSendById: number
    requesterName: string
    updatedAt: string
    userAvatarLink: string
};

function FastMessageContainer(props: FastElementsPropsType) {
    const {
        opened,
        dropSelection
    } = props;

    const settingsConfig = useSettings();
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [conversation, setConversations] = useState<ConversationType[]>([]);
    const history = useHistory();
    const {t} = useTranslation();

    return (
        <Box
            className={s.Container}
            style={{
                visibility: !!opened ? "visible" : "hidden"
            }}
        >
            {dropSelection}
            <style>
                {`
                .${s.Container} {
                display: ${history?.location?.pathname === headerListLinks.chats
                || history?.location?.pathname === headerListLinks.auth
                || history?.location?.pathname === headerListLinks.music ? "none" : "flex"}
                }
                .messageText {
                min-width: 200px;
                }
                .${s.Container} {
                box-shadow: 0px 0px 8px 0px ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.8)} !important;
                z-index:${!!opened ? "100" : "10"};
                }
                .${s.HeaderActions} svg:hover {
                background: ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.8)};
                }
                .${s.Container} {
                bottom: ${isOpened ? "0px" : "-400px"};
                }
                .${s.Container} .chatBoxTop {
                height: 300px;
                }
                .${s.Container} .fromNow {
                width: max-content;
                }
                .${s.Container} .noConversationText, .noConversationImage {
                display: none;
                }
                .noMessagesLabel {
                font-size: 35px;
                }
                .${s.Container} .messageText {
                text-align: left!important;
                padding-top:3px;
                padding-bottom: 25px;
                }
                .react-emoji-picker {
                position: absolute;
                width: 118%;
                top: -310px;
                z-index: 10;
                }
                @media (max-width: 1024px) {
                .fast_m_up {
                display: none;
                }
                .${s.Container} {
                min-width:${isOpened ? "300px!important" : "50px"};
                }
                .${s.Header} > span:not(.${s.HeaderActions}), .fast_m_up {
                display: ${isOpened ? "block!important" : "none"};
                }
                }
                `}
            </style>
            <Typography
                component={"p"}
                className={s.Header}
            >
                <span>Messages</span>
                <span
                    className={s.HeaderActions}
                >
                    <Tooltip title={t("Write a message")} arrow placement="top">
                                <TooltipButtonCover>
                                    <BiMessageRoundedDots
                                        className={"fast_m_up"}
                                        onClick={() => {
                                            history.push(headerListLinks.chats);
                                            setIsOpened(false);
                                        }}
                                    />
                                </TooltipButtonCover>
                            </Tooltip>
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
            <div>
                {
                    isOpened
                    && <FriendsContainer
                        conversation={conversation}
                        setConversations={setConversations}
                    />
                }
            </div>
        </Box>
    )
}

export default FastMessageContainer;