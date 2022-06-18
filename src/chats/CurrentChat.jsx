import {buttonsConfig} from "../createPost/CreatePostLine";
import Message from "./Message";


function CurrentChat(props) {
    const {
        messages,
        newMessage,
        setNewMessage,
        customStyle,
        userInformation
    } = props;

    return(
        <>
            <div className="chatBoxTop">
                {messages.map((m) => (
                    <div>
                        <Message
                            message={m}
                            own={m.sender === userInformation.id}
                        />
                    </div>
                ))}
            </div>
            <div className="chatBoxBottom">
                  <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                  />
                <button
                    className={`button ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => props.open()}
                >
                   Send
                </button>
            </div>
        </>
    )
}

export default CurrentChat;