import {useTranslation} from "react-i18next";
import {Backdrop, CircularProgress} from "@mui/material";
import s from "../createPost/create-post.module.css";
import {BsPencil} from "react-icons/all";
import InputEmoji from 'react-input-emoji';
import {useState} from "react";
import {updateMessageById} from "./chatHelper";

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
                    <div className={s.Container + " chatUpdateModal"}>
                        <Backdrop
                            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                            open={isBackdoor}
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
                                className={`chatPostBtn`}
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

export default UpdateChatMessageModal;