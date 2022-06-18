import {useEffect, useContext, useState} from "react";
import Context from "../helpers/contextHelper";
import "./messenger.css";
import {getSettings} from "../db";
import {alpha} from "@mui/material";
import Messenger from "./Messenger";
import {createChatMessage} from "./chatHelper";

function ChatContainer() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [settings, setSettings] = useState({});

    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

    const {socket, notify} = useContext(Context);

    useEffect(() => {
        socket.on("getMessageInChat", (data) => {
            console.log(data)
            console.log("Receive new message")
            setArrivalMessage({
                sender: data?.senderId,
                text: data?.text,
                createdAt: Date.now(),
            });
        });

    }, [socket]);

    useEffect(() => {
        try {
            console.log(arrivalMessage, currentChat?.members?.includes(arrivalMessage?.sender))
            if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
                setMessages((prev) => [...prev, arrivalMessage]);
            }
        } catch (error) {
            console.error(error)
        }
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        if (userInformation?.id) {
            socket.emit("addUserToChat", userInformation?.id);
            socket.on("getUsersInChat", (users) => {


            });
        }
    }, [userInformation]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: userInformation.id,
            text: newMessage,
            conversationId: currentChat.id,
        };

        console.log(currentChat)
        const receiverId = currentChat.members.find(
            (member) => member !== userInformation.id
        );

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
                    console.log(res)
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

    return (
        <>
            <style>
                {`
                .chatMenuInput {
                 border-bottom: 1px solid ${settings?.configs?.color[settings?.color]};
                 }
                 .chatMenuWrapper {
                 border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                 }
                 .conversation:hover {
                 color: ${settings?.configs?.color[settings?.color]};
                 background: ${alpha(settings?.configs?.color[settings?.color] || "#cecccc", 0.3)};
                 }
                `}
            </style>
            <Messenger
                settings={settings}
                setCurrentChat={setCurrentChat}
                currentChat={currentChat}
                messages={messages}
                setNewMessage={setNewMessage}
                newMessage={newMessage}
                setMessages={setMessages}
                userInformation={userInformation}
                handleSubmit={handleSubmit}
            />
        </>
    );
}


export default ChatContainer;