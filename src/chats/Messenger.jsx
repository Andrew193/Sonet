import FriendPin from "./FriendPin";
import CurrentChat from "./CurrentChat";
import {useEffect, useMemo, useState} from "react";
import {approvedByMe, getForApprovalMatesList} from "./chatHelper";
import {notify} from "../App";
import {buttonsConfig} from "../createPost/CreatePostLine";


function Messenger(props) {
    const {
        settings,
        setCurrentChat,
        currentChat,
        setConversations,
        messages,
        setNewMessage,
        newMessage,
        userInformation,
        handleSubmit,
        setMessages,
        conversations
    } = props;

    const matesList = useMemo(() => {
        return conversations?.map((friend) =>
            <div
                key={`${friend?.receiverId}${friend?.requestSendById}`}
                onClick={() => {
                    setCurrentChat({
                        members: [+friend?.receiverId, +friend?.requestSendById],
                        id: `${friend?.receiverId}${friend?.requestSendById}`
                    })
                }}
            >
                <FriendPin
                    friendName={friend?.receiverName}
                    approved={friend?.approved}
                />
            </div>
        )
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
                />
            </div>
        })
    }, [possibleMates]);

    useEffect(() => {
        async function getPossibleMates() {
            getForApprovalMatesList(userInformation?.id,
                (response) => {
                    setPossibleMates(response?.clearData)
                    console.log(response)
                },
                (errorMessage) => {
                    notify(errorMessage || "Error");
                })
        }

        if (userInformation?.id) {
            getPossibleMates();
        }
    }, [userInformation?.id])

    useEffect(() => {
        approvedByMe(userInformation?.id,
            (response) => {
                console.log(response, "fdsfdsfsdffsfsffsfdffsdf")
                // const realConversation = possibleMates?.filter((friend) => friend?.approved);
                //
                // if (realConversation || realConversation?.length) {
                //     setConversations((state) => [...(realConversation || []), ...state])
                // }
            },
            (errorMessage) => {
                notify(errorMessage || "Error");
            })
    }, [userInformation?.id])

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
                    <input
                        placeholder="Search for friends"
                        className="chatMenuInput"
                    />
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
                            ? <CurrentChat
                                messages={messages}
                                newMessage={newMessage}
                                setNewMessage={setNewMessage}
                                customStyle={settings}
                                userInformation={userInformation}
                                handleSubmit={handleSubmit}
                                conversationId={currentChat?.id}
                                setMessages={setMessages}
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