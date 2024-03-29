import {buttonsConfig} from "../create-post/CreatePostLine";
import Message from "./Message";
import {useEffect, useRef, useState} from "react";
import {getConversationById} from "./chatHelper";
import {notify} from "../App";
import {Tooltip} from "@mui/material";
import Loader from "../components/common/spinner/Spinner";
import {BsPencil, TiMessages} from "react-icons/all";
import {useTranslation} from "react-i18next";
import React from "react";
import InputEmoji from 'react-input-emoji';
import {getUserAvatar} from "../posts/postsHelper";
import {getElementsThemeConfig} from "../utils";
import {Dayjs} from "../helpers/dateHelper";
import PropTypes from "prop-types";
import CommentStyles from "../components/comments/comments.module.css";

const PostButtonCover = React.forwardRef(function MyComponent(props, ref) {
    //  Spread the props to the underlying DOM element.
    return <div {...props} ref={ref} style={{display: "flex"}}><BsPencil/></div>
});

function MessageCover(props) {
    const {
        m,
        userId,
        avatar,
        receiverId,
        setMessages
    } = props;

    return (
        <Message
            receiverId={receiverId}
            key={m?.id}
            message={m}
            avatar={avatar}
            setMessages={setMessages}
            own={(+m.sender === +userId) || (+m.createdById === +userId)}
        />
    )
}

MessageCover.propTypes = {
    m: PropTypes.object,
    userId: PropTypes.number,
    avatar: PropTypes.string,
    receiverId: PropTypes.number,
    setMessages: PropTypes.func
};

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
        settings,
        receiverId
    } = props;

    const scrollRef = useRef();
    const [isLoader, setIsLoader] = useState(true);
    const [avatars, setAvatars] = useState([]);

    useEffect(() => {
        async function getData() {
            getConversationById(conversationId,
                (response) => setMessages(response?.clearData),
                (errorMessage) => notify(errorMessage || "Error"))
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
            scrollRef.current?.scrollBy(0, 60000)
            setIsLoader(false)
        }, 1000)
    }, [messages]);

    const {t} = useTranslation();

    return (
        <>
            <div className="chatBoxTop" ref={scrollRef}>
                {messages?.sort((a, b) => a.id - b.id)?.map((m, index) => {
                    const now = Dayjs(messages[index]?.createdAt).format('DD/MM/YYYY');
                    const then = Dayjs(messages[index - 1]?.createdAt || "").format('DD/MM/YYYY');
                    return <>
                        {
                            now !== then &&
                            <div className={"ChatDayShowContainer"}><span className={"ChatDayShow"}>{now}</span></div>
                        }
                        <div key={messages[index]?.createdAt}>
                            <MessageCover
                                m={m}
                                avatar={avatars[0]?.id === m?.createdById ? avatars[0]?.avatar : avatars[1]?.avatar}
                                userId={userInformation?.id}
                                receiverId={receiverId}
                                setMessages={setMessages}
                            />
                        </div>
                    </>
                })}

                {!isLoader && messages?.length === 0
                    ? <div className={"noMessagesLabel"}>
                        {t("There are no messages yet. Be the first")})
                        <TiMessages
                            style={{
                                top: '35%'
                            }}
                            className={"noConversationImage"}
                        />
                    </div>
                    : null}

                {isLoader && <div className={"chatLoader messagesLoader"}><Loader/></div>}
            </div>
            <div
                style={getElementsThemeConfig(settings)}
                className="chatBoxBottom"
            >
                <InputEmoji
                    value={newMessage}
                    onChange={setNewMessage}
                    cleanOnEnter
                    placeholder={t("So... What is it?")}
                />
                <span
                    className={`${buttonsConfig[customStyle?.color]} chatPostBtn  ${CommentStyles.CommentSendButton}`}
                    onClick={handleSubmit}
                >
                    <Tooltip title={t("Post")} arrow placement="top"><PostButtonCover/></Tooltip>
                </span>
            </div>
        </>
    )
}

CurrentChat.propTypes = {
    messages: PropTypes.array,
    newMessage: PropTypes.any,
    setNewMessage: PropTypes.func,
    customStyle: PropTypes.any,
    userInformation: PropTypes.object,
    handleSubmit: PropTypes.func,
    conversationId: PropTypes.string,
    setMessages: PropTypes.func,
    settings: PropTypes.object,
    receiverId: PropTypes.number
};

export default CurrentChat;