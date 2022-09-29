import {useEffect, useMemo, useState, useContext, useRef, ReactNode} from "react";
import {createChatMessage, getConversationById, getMatesList} from "../chats/chatHelper";
import {Context, notify} from "../App";
import FriendPin, {FriendTypeForConversations} from "./FriendPin";
import SelectedChatMessages from "../chats/SelectedChatMessages";
import {useOutsideClick, useSettings} from "../hooks";
import React from "react";
import {ConversationType} from "./FastMessageContainer";
import {getItemFromLocalStorage} from "../localStorageService";

type FriendsContainerProps = {
    conversation: FriendTypeForConversations[]
    setConversations: React.Dispatch<React.SetStateAction<ConversationType[]>>
}

type UserInformationType = {
    [key: string]: any,
    id: number
}

type ArrivalMessageType = {
    sender: number | string,
    text: string,
    createdAt: Date | number,
}

type CurrentChatType = {
    id: number | string,
    members: number | string[]
}

function FriendsContainer(props: FriendsContainerProps) {
    const {
        conversation,
        setConversations
    } = props;

    const userInformation: UserInformationType = getItemFromLocalStorage("userInfo");
    const [currentChat, setCurrentChat] = useState<CurrentChatType | null>(null);
    const [messages, setMessages] = useState<ArrivalMessageType[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessageType | null>(null);
    const {settings} = useSettings();
    const [usersInChat, setUsersInChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const {socket} = useContext(Context);

    useEffect(() => {
        async function getMates() {
            getMatesList(userInformation?.id,
                (response: { clearData: ConversationType[] }) => {
                    setConversations(response?.clearData)
                },
                (errorMessage: ReactNode | string) => {
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

    useEffect(() => {
        socket.on("updateMessages", (data) => {
            if (!!data?.refresh) {
                if (!!currentChat?.id) {
                    getConversationById(currentChat?.id,
                        (response: { clearData: ArrivalMessageType[] }) => {
                            if (currentChat?.id) {
                                setMessages((state) => {
                                    return JSON.parse(JSON.stringify(response?.clearData))
                                })
                            }
                        },
                        (errorMessage: ReactNode | string) => {
                            notify(errorMessage || "Error");
                        })
                }
            }
        })
    }, [socket, currentChat])

    useEffect(() => {
        try {
            // @ts-ignore
            if (arrivalMessage && currentChat?.members?.includes(arrivalMessage.sender)) {
                setMessages((prev: ArrivalMessageType[]) => [...prev, arrivalMessage]);
            }
        } catch (error) {
            console.error(error)
        }
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        async function getMates() {
            getMatesList(userInformation?.id,
                (response: { clearData: ConversationType[] }) => {
                    setConversations(response?.clearData)
                },
                (errorMessage: ReactNode | string) => {
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
            // @ts-ignore
            return currentChat?.members?.find(
                (member: number) => member !== userInformation.id
            )
        }
        return null;
    }, [currentChat])

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const message = {
            sender: userInformation.id,
            text: newMessage,
            conversationId: currentChat?.id,
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
                (res: { data: ArrivalMessageType }) => {

                    setMessages((currentMessages) => [...currentMessages, res.data]);
                    setNewMessage("");
                },
                (errorMessage: ReactNode | string) => {
                    notify(errorMessage || "Error");
                })

        } catch (err) {
            console.error(err);
        }
    };

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