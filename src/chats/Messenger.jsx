import FriendPin from "./FriendPin";
import CurrentChat from "./CurrentChat";
import {useEffect, useMemo, useState} from "react";
import {getForApprovalMatesList} from "./chatHelper";
import {notify} from "../App";
import {buttonsConfig} from "../createPost/CreatePostLine";
import {useOutsideClick} from "../hooks";
import {useRef} from "react";
import Loader from "../components/common/spinner/Spinner";


function Messenger(props) {
    const {
        setConversations,
        setIsLoading,
        isLoading,
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
            if (index === conversations?.length - 1) {
                setIsLoading(() => false)
            }

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
                    id={index}
                    receiverId={friend?.receiverId}
                    requestSendById={friend?.requestSendById}
                    friendName={friend?.receiverName}
                    approved={friend?.approved}
                    requestMode
                    setConversations={setConversations}
                    setPossibleMates={setPossibleMates}
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
                                {matesList}
                                {(isLoading && matesList?.length === 0) && <div
                                    className={"chatLoader"}
                                >
                                    <Loader/>
                                </div>
                                }
                            </>
                            : <>
                                <h3>Requests</h3>
                                {possibleMatesList}
                            </>
                    }
                </div>
            </div>
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

        </div>
    )
}

export default Messenger;