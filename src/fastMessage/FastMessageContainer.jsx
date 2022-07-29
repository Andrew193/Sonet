import {useEffect, useState} from "react";
import {getSettings} from "../db";
import s from "./fast-message.module.css";
import {alpha, Box, Tooltip, Typography} from "@mui/material";
import {BiMessageRoundedDots, BiUpArrowAlt, FiArrowDown} from "react-icons/all";
import React from "react"
import {useTranslation} from "react-i18next";
import FriendsContainer from "./FriendsContainer";
import {useHistory} from "react-router-dom";
import {headerListLinks} from "../vars";

export const TooltipButtonCover = React.forwardRef(function MyComponent(props, ref) {
    //  Spread the props to the underlying DOM element.
    return <div {...props} ref={ref} style={{display: "flex"}}>{props?.children}</div>
});

function FastMessageContainer() {
    const [settings, setSettings] = useState({});
    const [isOpened, setIsOpened] = useState(false);
    const [conversation, setConversations] = useState([]);
    const history = useHistory();
    const {t} = useTranslation();

    useEffect(() => {
        async function getData() {
            const response = await getSettings();
            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <Box
            className={s.Container}
        >
            <style>
                {`
                .${s.Container} {
                display: ${history?.location?.pathname === headerListLinks.chats || history?.location?.pathname === headerListLinks.auth ? "none" : "flex"}
                }
                .${s.Container} {
                box-shadow: 0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)} !important;
                }
                .${s.HeaderActions} svg:hover {
                background: ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)};
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