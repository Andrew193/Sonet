import {buttonsConfig} from "../createPost/CreatePostLine";
import Message from "./Message";
import {useEffect} from "react";
import {getConversationById} from "./chatHelper";
import {notify} from "../App";


function CurrentChat(props) {
    const {
        messages,
        newMessage,
        setNewMessage,
        customStyle,
        userInformation,
        handleSubmit,
        conversationId,
        setMessages
    } = props;

    console.log(messages)

    useEffect(() => {
        async function getData() {
            getConversationById(conversationId,
                (response) => {
                    setMessages(response)
                    console.log(response)
                },
                (errorMessage) => {
                    notify(errorMessage || "Error");
                })
        }

        if (conversationId) {
            getData();
        }

    }, [conversationId])

    return (
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
                    onClick={handleSubmit}
                >
                    Send
                </button>
            </div>
        </>
    )
}

export default CurrentChat;