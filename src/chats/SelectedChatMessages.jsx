import CurrentChat from "./CurrentChat";
import {useTranslation} from "react-i18next";
import {BiConversation} from "react-icons/all";
import React from "react";
import PropTypes from "prop-types";

function SelectedChatMessages(props) {
    const {
        currentChat,
        wrapperRef,
        messages,
        newMessage,
        setNewMessage,
        settings,
        userInformation,
        handleSubmit,
        setMessages,
        receiverId
    } = props;

    const {t} = useTranslation();

    return (
        <>
            <div className="chatBox">
                <div
                    className="chatBoxWrapper"
                    style={{
                        paddingLeft: '0px',
                        paddingRight: '0px',
                    }}
                >
                    {
                        currentChat
                            ?
                            <div
                                ref={wrapperRef}
                                className={"mainMessagesCaver"}
                            >
                                <CurrentChat
                                    messages={messages}
                                    newMessage={newMessage}
                                    setNewMessage={setNewMessage}
                                    customStyle={settings}
                                    userInformation={userInformation}
                                    handleSubmit={handleSubmit}
                                    conversationId={currentChat?.id}
                                    setMessages={setMessages}
                                    settings={settings}
                                    receiverId={receiverId}
                                />
                            </div>
                            : <span className="noConversationText">
                                    {t("Open a conversation to start a chat.")}
                                <BiConversation
                                    className="noConversationImage"
                                />
                            </span>
                    }
                </div>
            </div>
        </>
    )
}

SelectedChatMessages.propTypes = {
    currentChat: PropTypes.object,
    wrapperRef: PropTypes.object,
    messages: PropTypes.array,
    newMessage: PropTypes.any,
    setNewMessage: PropTypes.func,
    settings: PropTypes.object,
    userInformation: PropTypes.object,
    handleSubmit: PropTypes.func,
    setMessages: PropTypes.func,
    receiverId: PropTypes.number
};

export default SelectedChatMessages;