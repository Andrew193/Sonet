import FriendPin from "./FriendPin";
import CurrentChat from "./CurrentChat";


function Messenger(props) {
    const {
        settings,
        setCurrentChat,
        currentChat,
        messages,
        setNewMessage,
        newMessage,
        userInformation,
        handleSubmit
    } = props;

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input
                        placeholder="Search for friends"
                        className="chatMenuInput"
                    />
                    <div
                        onClick={() => {
                            setCurrentChat({
                                members: [6, 2],
                                id: `62`
                            })
                        }}
                    >
                        <FriendPin/>
                    </div>
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat
                            ? <CurrentChat
                                messages={messages}
                                newMessage={newMessage}
                                setNewMessage={setNewMessage}
                                customStyle={settings}
                                userInformation={userInformation}
                                handleSubmit={handleSubmit}
                            />
                            : <span className="noConversationText">
                                    Open a conversation to start a chat.
                            </span>
                    }
                </div>
            </div>

        </div>
    )
}

export default Messenger;