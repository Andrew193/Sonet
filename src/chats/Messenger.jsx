import FriendPin from "./FriendPin";
import CurrentChat from "./CurrentChat";
import {useEffect, useMemo, useState} from "react";
import {getForApprovalMatesList} from "./chatHelper";
import {notify} from "../App";


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

        getPossibleMates();
    }, [])

    console.log(possibleMates,"possibleMates")
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input
                        placeholder="Search for friends"
                        className="chatMenuInput"
                    />
                    {matesList}
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