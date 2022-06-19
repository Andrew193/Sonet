import FriendPin from "./FriendPin";
import CurrentChat from "./CurrentChat";
import {useEffect, useMemo, useState} from "react";
import {getForApprovalMatesList} from "./chatHelper";
import {notify} from "../App";
import {buttonsConfig} from "../createPost/CreatePostLine";
import {useOutsideClick} from "../hooks";
import {useRef} from "react";


function Messenger(props) {
    const {
        settings,
        setCurrentChat,
        currentChat,
        messages,
        setNewMessage,
        newMessage,
        userInformation,
        handleSubmit,
        setMessages,
        conversations
    } = props;

    const matesList = useMemo(() => {
        return conversations?.map((friend, index) => {
            return <div
                key={index}
                onClick={() => {
                    if (friend?.approved) {
                        setCurrentChat({
                            members: [+friend?.receiverId, +friend?.requestSendById],
                            id: `${[friend?.receiverId, friend?.requestSendById].sort(function (a, b) {
                                return a - b;
                            }).join("")}`
                        })
                    }
                }}
            >
                <FriendPin
                    friendName={friend?.receiverName}
                    approved={friend?.approved}
                />
            </div>
        })
    }, [conversations]);


    const [possibleMates, setPossibleMates] = useState(null);
    const [chatMode, setChatMode] = useState(false);

    const possibleMatesList = useMemo(() => {
        return possibleMates?.map((friend, index) => {
            if (friend?.approved) {
                return null;
            }
            return <div
                key={`${index}`}
            >
                <FriendPin
                    receiverId={friend?.receiverId}
                    requestSendById={friend?.requestSendById}
                    friendName={friend?.receiverName}
                    approved={friend?.approved}
                    requestMode
                    friend={friend}
                />
            </div>
        })
    }, [possibleMates]);

    useEffect(() => {
        async function getPossibleMates() {
            getForApprovalMatesList(userInformation?.id,
                (response) => {
                    setPossibleMates(response?.clearData)
                },
                (errorMessage) => {
                    notify(errorMessage || "Error");
                })
        }

        if (userInformation?.id) {
            getPossibleMates();
        }
    }, [userInformation?.id])

    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        setCurrentChat(null)
    })

    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <div
                        className={"chatModeLine"}
                    >
                        <button
                            onClick={() => {
                                setChatMode(false)
                            }}
                            className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]} ${!chatMode ? "activeChatMode" : ""}`}
                        >My Friends
                        </button>
                        <button
                            onClick={() => {
                                setChatMode(true)
                            }}
                            className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]} ${chatMode ? "activeChatMode" : ""}`}
                        >Friend Requests
                        </button>
                    </div>
                    {
                        !chatMode
                        && <input
                            placeholder="Search for friends"
                            className="chatMenuInput"
                        />
                    }
                    {
                        !chatMode
                            ? <>
                                <h3>Mates</h3>
                                {matesList}</>
                            : <>
                                <h3>Requests</h3>
                                {possibleMatesList}
                            </>
                    }
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {
                        currentChat
                            ?
                            <div
                                ref={wrapperRef}
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
                                />
                            </div>
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