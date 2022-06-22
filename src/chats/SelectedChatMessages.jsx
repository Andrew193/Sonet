import CurrentChat from "./CurrentChat";


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
        setMessages
    } = props;

    return (
        <>
            <div className="chatBox">
                <div
                    className="chatBoxWrapper"
                    style={{
                        paddingLeft: '0px',
                        paddingRight: '0px'
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
                                />
                            </div>
                            : <span className="noConversationText">
                                    Open a conversation to start a chat.
                            </span>
                    }
                </div>
            </div>
        </>
    )
}

export default SelectedChatMessages;