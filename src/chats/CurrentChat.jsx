import {buttonsConfig} from "../createPost/CreatePostLine";
import Message from "./Message";
import {useEffect, useRef, useState} from "react";
import {getConversationById} from "./chatHelper";
import {notify} from "../App";
import {alpha, Tooltip} from "@mui/material";
import Loader from "../components/common/spinner/Spinner";
import {BsPencil, TiMessages} from "react-icons/all";
import {useTranslation} from "react-i18next";
import {getUserAvatar} from "../posts/PostItem";
import React from "react";
import InputEmoji from 'react-input-emoji';

const PostButtonCover = React.forwardRef(function MyComponent(props, ref) {
    //  Spread the props to the underlying DOM element.
    return <div {...props} ref={ref} style={{display: "flex"}}><BsPencil/></div>
});

function MessageCover(props) {
    const {
        m,
        userId,
        avatar
    } = props;

    return (
        <Message
            key={m?.id}
            message={m}
            avatar={avatar}
            own={(+m.sender === +userId) || (+m.createdById === +userId)}
        />
    )
}

function CurrentChat(props) {
    const {
        messages,
        newMessage,
        setNewMessage,
        customStyle,
        userInformation,
        handleSubmit,
        conversationId,
        setMessages,
        settings
    } = props;

    const scrollRef = useRef();
    const [isLoader, setIsLoader] = useState(true);
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        async function getData() {
            getConversationById(conversationId,
                (response) => {
                    setMessages(response?.clearData)
                },
                (errorMessage) => {
                    notify(errorMessage || "Error");
                })
        }

        if (conversationId) {
            getData();
        }

    }, [conversationId])

    useEffect(() => {
        if (messages) {
            const usedId = [];
            for (let i = 0; i < messages?.length; i++) {
                if (usedId?.length < 2) {
                    if (!usedId?.includes(messages[i]?.createdById)) {
                        usedId.push(messages[i]?.createdById)
                        getUserAvatar(null, (newAvatar) => setAvatars((state) => [...state, {
                            avatar: newAvatar,
                            id: messages[i]?.createdById
                        }]), messages[i]?.createdById)
                    }
                } else {
                    break;
                }
            }
        }

        setTimeout(() => {
            scrollRef.current?.scrollIntoView({behavior: "smooth"});
            setIsLoader(false)
        }, 1000)
    }, [messages]);

    const {t} = useTranslation();

    return (
        <>
            <div className="chatBoxTop">
                {messages?.map((m, index) => <div ref={scrollRef} key={index}>
                    <MessageCover
                        m={m}
                        avatar={avatars[0]?.id === m?.createdById ? avatars[0]?.avatar : avatars[1]?.avatar}
                        userId={userInformation?.id}
                    />
                </div>)}

                {!isLoader && messages?.length === 0
                    ? <div
                        className={"noMessagesLabel"}
                    >
                        {t("There are no messages yet. Be the first")})
                        <TiMessages
                            style={{
                                top: '35%'
                            }}
                            className={"noConversationImage"}
                        />
                    </div>
                    : null}

                {isLoader && <div
                    className={"chatLoader messagesLoader"}
                >
                    <Loader/>
                </div>
                }
            </div>
            <div
                style={{
                    boxShadow: `0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)}`,
                }}
                className="chatBoxBottom"
            >
                <InputEmoji
                    value={newMessage}
                    onChange={setNewMessage}
                    cleanOnEnter
                    placeholder={t("So... What is it?")}
                />
                <span
                    className={`${buttonsConfig[customStyle?.color]} chatPostBtn`}
                    onClick={handleSubmit}
                >
                    <Tooltip title={t("Post")} arrow placement="top"><PostButtonCover/></Tooltip>
                </span>
            </div>
        </>
    )
}

export default CurrentChat;