import FriendPin from "./FriendPin";
import {useEffect, useState} from "react";
import {getForApprovalMatesList} from "./chatHelper";
import {notify} from "../App";
import {buttonsConfig} from "../create-post/CreatePostLine";
import {useOutsideClick} from "../hooks";
import {useRef} from "react";
import PeopleContainer from "./PeopleContainer";
import SelectedChatMessages from "./SelectedChatMessages";
import {useTranslation} from "react-i18next";
import MatePin from "./MatePin";

function Messenger(props) {
    const {
        setConversations,
        usersInChat,
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
        conversations,
        receiverId
    } = props;

    const [matesList, setMatesList] = useState([]);
    const [possibleMatesList, setPossibleMatesList] = useState([]);
    useEffect(() => {
        setIsLoading(() => false)
        setMatesList(() => conversations?.map((friend, index) => (friend?.show === undefined || friend?.show === true) ?
            <MatePin
                usersInChat={usersInChat}
                key={index}
                currentChat={currentChat}
                index={index}
                friend={friend}
                setCurrentChat={setCurrentChat}
                setConversations={setConversations}
            /> : null))
    }, [conversations, currentChat?.currentIndex, usersInChat]);

    const [possibleMates, setPossibleMates] = useState(null);
    const [chatMode, setChatMode] = useState(false);

    useEffect(() => {
        setPossibleMatesList(() => possibleMates?.map((friend, index) => {
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
        }))
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

    const {t} = useTranslation();

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
                        >{t("My Friends")}
                        </button>
                        <button
                            onClick={() => {
                                setChatMode(true)
                            }}
                            className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]} ${chatMode ? "activeChatMode" : ""}`}
                        >{t("Friend Requests")}
                        </button>
                    </div>
                    <PeopleContainer
                        chatMode={chatMode}
                        matesList={matesList}
                        isLoading={isLoading}
                        conversations={conversations}
                        setConversations={setConversations}
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
                receiverId={receiverId}
            />
        </div>
    )
}

export default Messenger;