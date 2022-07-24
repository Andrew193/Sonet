import {useEffect, useMemo, useState, useContext, useRef} from "react";
import {createChatMessage, getConversationById, getMatesList} from "../chats/chatHelper";
import {notify} from "../App";
import FriendPin from "./FriendPin";
import Context from "../helpers/contextHelper";
import {getSettings} from "../db";
import SelectedChatMessages from "../chats/SelectedChatMessages";
import {useOutsideClick} from "../hooks";

function FriendsContainer(props) {
    const {
        conversation,
        setConversations
    } = props;

    const userInformation = JSON.parse(localStorage.getItem("userInfo"));
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [settings, setSettings] = useState({});
    const [usersInChat, setUsersInChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {socket} = useContext(Context);

    useEffect(() => {
        async function getMates() {
            getMatesList(userInformation?.id,
                (response) => {
                    setConversations(response?.clearData)
                },
                (errorMessage) => {
                    notify(errorMessage || "Error");
                })
        }

        if (userInformation?.id && !conversation.length) {
            getMates();
        }
    }, [userInformation]);

    const friendsConfig = useMemo(() => {
        return conversation?.map((friend, index) => {
            if (friend?.approved) {
                return <FriendPin
                    key={index}
                    index={index}
                    {...friend}
                    userId={userInformation?.id}
                    setConversations={setConversations}
                    setCurrentChat={setCurrentChat}
                />
            }
            return null;
        })
    }, [conversation])

    useEffect(() => {
        socket.on("getMessageInChat", (data) => {
            setArrivalMessage({
                sender: data?.senderId,
                text: data?.text,
                createdAt: Date.now(),
            });
        });
    }, [socket]);

    useEffect(()=>{
        socket.on("updateMessages", (data) => {
            if (!!data?.refresh) {
                if (!!currentChat?.id) {
                    getConversationById(currentChat?.id,
                        (response) => {
                            if (currentChat?.id) {
                                setMessages((state) => {
                                    return JSON.parse(JSON.stringify(response?.clearData))
                                })
                            }
                        },
                        (errorMessage) => {
                            notify(errorMessage || "Error");
                        })
                }
            }
        })
    },[socket, currentChat])

    useEffect(() => {
        try {
            if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
                setMessages((prev) => [...prev, arrivalMessage]);
            }
        } catch (error) {
            console.error(error)
        }
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        async function getMates() {
            getMatesList(userInformation?.id,
                (response) => {
                    setConversations(response?.clearData)
                },
                (errorMessage) => {
                    notify(errorMessage || "Error");
                })
        }

        if (userInformation?.id) {
            setIsLoading(() => true)
            getMates();
        }
    }, [JSON.stringify(userInformation?.id)])

    useEffect(() => {
        if (userInformation?.id) {
            socket.on("getUsersInChat", (users) => {
                setUsersInChat(users)
            });
        }
    }, [userInformation?.id]);

    const receiverId = useMemo(() => {
        if (currentChat) {
            return currentChat?.members?.find(
                (member) => member !== userInformation.id
            )
        }
        return null;
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: userInformation.id,
            text: newMessage,
            conversationId: currentChat.id,
        };

        socket.emit("sendMessageToChat", {
            senderId: userInformation.id,
            receiverId,
            text: newMessage,
        });

        try {
            createChatMessage({
                    conversationId: message?.conversationId,
                    messageText: message?.text,
                    createdById: userInformation?.id
                },
                (res) => {

                    setMessages((currentMessages) => [...currentMessages, res.data]);
                    setNewMessage("");
                },
                (errorMessage) => {
                    notify(errorMessage || "Error");
                })

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        setCurrentChat(null)
    })

    return (
        <>
            {!currentChat && friendsConfig}
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
        </>
    )
}

export default FriendsContainer;