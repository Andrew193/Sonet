import {useEffect, useContext, useState} from "react";
import Context from "../helpers/contextHelper";
import "./messenger.css";
import FriendPin from "./FriendPin";
import CurrentChat from "./CurrentChat";
import {getSettings} from "../db";
import {alpha} from "@mui/material";
import Messenger from "./Messenger";

function ChatContainer() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [settings, setSettings] = useState({});

    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

    const {socket} = useContext(Context);

    useEffect(() => {
        socket.on("getMessageInChat", (data) => {
            console.log(data, "dfdfsfdfsdfs")
            setArrivalMessage({
                sender: data?.senderId,
                text: data?.text,
                createdAt: Date.now(),
            });
        });

    }, [socket]);

    useEffect(() => {
        arrivalMessage &&
        currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage]);

    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        if (userInformation?.id) {
            socket.emit("addUserToChat", userInformation?.id);
            socket.on("getUsersInChat", (users) => {


            });
        }
    }, [userInformation]);

    // useEffect(() => {
    //     const getConversations = async () => {
    //         try {
    //             const res = await axios.get("/conversations/" + user._id);
    //             setConversations(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getConversations();
    // }, [user._id]);

    // useEffect(() => {
    //     const getMessages = async () => {
    //         try {
    //             const res = await axios.get("/messages/" + currentChat?._id);
    //             setMessages(res.data);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getMessages();
    // }, [currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        debugger
        const message = {
            sender: userInformation.id,
            text: newMessage,
            conversationId: currentChat.id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== userInformation.id
        );

        socket.emit("sendMessageToChat", {
            senderId: userInformation.id,
            receiverId,
            text: newMessage,
        });

        // try {
        //     const res = await axios.post("/messages", message);
        //     setMessages([...messages, res.data]);
        //     setNewMessage("");
        // } catch (err) {
        //     console.log(err);
        // }
    };

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    console.log(messages)
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
                userInformation={userInformation}
                handleSubmit={handleSubmit}
            />
        </>
    );
}


export default ChatContainer;