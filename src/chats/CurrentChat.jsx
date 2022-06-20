import {buttonsConfig} from "../createPost/CreatePostLine";
import Message from "./Message";
import {useEffect, useRef, useState} from "react";
import {getConversationById} from "./chatHelper";
import {notify} from "../App";
import {alpha} from "@mui/material";
import Loader from "../components/common/spinner/Spinner";


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
    const [length, setLength] = useState(0);
    const [isLoader, setIsLoader] = useState(true);

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
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({behavior: "smooth"});
            setIsLoader(false)
        }, 1000)
    }, [messages]);

    return (
        <>
            <div className="chatBoxTop">
                {messages.map((m, index) => {
                    if (messages?.length - 1 === index) {
                        // setIsLoader(() => false)
                    }

                    return <div ref={scrollRef}>
                        <Message
                            message={m}
                            own={(+m.sender === +userInformation.id) || (+m.createdById === +userInformation.id)}
                        />
                    </div>
                })}

                {!isLoader && messages?.length === 0
                    ? <div
                        className={"noMessagesLabel"}
                    >There are no messages yet. Be the first))</div>
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
                  <textarea
                      className="chatMessageInput"
                      onChange={(e) => {
                          setNewMessage(e.target.value)
                      }}
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