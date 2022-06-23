import FriendPin from "./FriendPin";
import CurrentChat from "./CurrentChat";
import {useEffect, useMemo, useState} from "react";
import {getForApprovalMatesList} from "./chatHelper";
import {notify} from "../App";
import {buttonsConfig} from "../createPost/CreatePostLine";
import {useOutsideClick} from "../hooks";
import {useRef} from "react";
import Loader from "../components/common/spinner/Spinner";
import {AiOutlineClose, MdSentimentVeryDissatisfied} from "react-icons/all";
import MatesConditions from "./MatesConditions";
import RequestsConditions from "./RequestsConditions";
import MatesContainer from "./MatesContainer";
import RequestsContainer from "./RequestsContainer";
import PeopleContainer from "./PeopleContainer";
import SelectedChatMessages from "./SelectedChatMessages";


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
        setIsLoading(() => false)
        return conversations?.map((friend, index) => {

            return <div
                className={currentChat?.currentIndex === index ? "currentChat" : ""}
                key={index}
                onClick={() => {
                    if (friend?.approved) {
                        setCurrentChat({
                            members: [+friend?.receiverId, +friend?.requestSendById],
                            id: `${[friend?.receiverId, friend?.requestSendById].sort(function (a, b) {
                                return a - b;
                            }).join("")}`,
                            currentIndex: index
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
    }, [conversations, currentChat?.currentIndex]);

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
                    <PeopleContainer
                        chatMode={chatMode}
                        matesList={matesList}
                        isLoading={isLoading}
                        possibleMatesList={possibleMatesList}
                    />
                </div>
            </div>
            <SelectedChatMessages
                currentChat={currentChat}
                wrapperRef={wrapperRef}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                settings={settings}
                userInformation={userInformation}
                handleSubmit={handleSubmit}
                setMessages={setMessages}
            />
        </div>
    )
}

export default Messenger;