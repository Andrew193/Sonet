import CurrentChat from "./CurrentChat";
import {useTranslation} from "react-i18next";
import {BiConversation} from "react-icons/all";

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
                        minHeight: '753px'
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

export default SelectedChatMessages;