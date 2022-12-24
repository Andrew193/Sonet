import {useState} from "react";
import FastMessagesStyles from "./fast-message.module.css";
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
            className={FastMessagesStyles.Container}
            style={{
                visibility: opened ? "visible" : "hidden"
            }}
        >
            {dropSelection}
            <style>
                {`
                .react-emoji-picker--container {
                top: -355px;
                }
                .messageText {
                min-width: 200px;
                }
                .${FastMessagesStyles.Container} {
                box-shadow: 0px 0px 8px 0px ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.8)} !important;
                z-index:${opened ? "100" : "10"};
                }
                .${FastMessagesStyles.HeaderActions} svg:hover {
                background: ${alpha(settingsConfig?.settings?.configs?.color[settingsConfig?.settings?.color] || "#b6c0f3", 0.8)};
                }
                .${FastMessagesStyles.Container} {
                bottom: ${isOpened ? "0px" : "-400px"};
                }
                .${FastMessagesStyles.Container} .chatBoxTop {
                height: 300px;
                }
                .${FastMessagesStyles.Container} .fromNow {
                width: max-content;
                }
                .${FastMessagesStyles.Container} .noConversationText, .noConversationImage {
                display: none;
                }
                .noMessagesLabel {
                font-size: 35px;
                }
                .${FastMessagesStyles.Container} .messageText {
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
                .${FastMessagesStyles.Container} {
                min-width:${isOpened ? "300px!important" : "50px"};
                }
                .${FastMessagesStyles.Header} > span:not(.${FastMessagesStyles.HeaderActions}), .fast_m_up {
                display: ${isOpened ? "block!important" : "none"};
                }
                }
                `}
            </style>
            <Typography
                component={"p"}
                className={FastMessagesStyles.Header}
            >
                <span>Messages</span>
                <span className={FastMessagesStyles.HeaderActions}>
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
            <div>{isOpened && <FriendsContainer conversation={conversation} setConversations={setConversations}/>}</div>
        </Box>
    )
}

export default FastMessageContainer;