import React from "react";
import {useTranslation} from "react-i18next";
import {Backdrop, CircularProgress} from "@mui/material";
import CreatePostStyles from "../create-post/create-post.module.css";
import {BsPencil} from "react-icons/all";
import InputEmoji from 'react-input-emoji';
import {useState} from "react";
import {updateMessageById} from "./chatHelper";
import PropTypes from "prop-types";

function UpdateChatMessageModal(props) {
    const {
        setIsOpened,
        socket,
        receiverId,
        setMessages,
        isOpened,
        notify,
        messageToUpdateId
    } = props;

    const {t} = useTranslation();
    const [text, setText] = useState('')
    const [isBackdoor, setIsBackdoor] = useState(false);

    return (
        <>
            {
                isOpened ?
                    <div className={`${CreatePostStyles.Container} chatUpdateModal`}>
                        <Backdrop
                            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open={isBackdoor || false}
                        >
                            <CircularProgress color="inherit"/>
                        </Backdrop>
                        <InputEmoji
                            value={text}
                            onChange={setText}
                            cleanOnEnter
                            placeholder={t("Type a message")}
                        />
                        <p>
                            <span
                                className={"chatPostBtn"}
                                onClick={() => {
                                    setIsOpened(false);
                                    setIsBackdoor(() => true);
                                    window?.document?.body?.querySelector(".App")?.classList?.remove("Open")
                                    updateMessageById(messageToUpdateId, text, socket, receiverId)
                                        .then(() => {
                                            setIsBackdoor(() => false)
                                            notify("Updated");
                                            setMessages((state) => JSON.parse(JSON.stringify(state?.map((message) => message?.id === messageToUpdateId ? {
                                                ...message,
                                                messageText: text
                                            } : message))))
                                        });
                                }}
                            >
                                <BsPencil/>
                            </span>
                        </p>
                    </div>
                    : null
            }
        </>
    )
}

UpdateChatMessageModal.propTypes = {
    setIsOpened: PropTypes.func,
    socket: PropTypes.object,
    receiverId: PropTypes.number,
    setMessages: PropTypes.func,
    isOpened: PropTypes.bool,
    notify: PropTypes.func,
    messageToUpdateId: PropTypes.number
};

export default UpdateChatMessageModal;