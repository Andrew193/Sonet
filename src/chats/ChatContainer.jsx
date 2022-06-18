import {useEffect, useContext, useState} from "react";
import Context from "../helpers/contextHelper";
import "./messenger.css";
import FriendPin from "./FriendPin";

function ChatContainer() {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const userInformation = JSON.parse(localStorage.getItem("userInfo"));


    const {socket} = useContext(Context);

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
    }, [socket, userInformation]);

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

    return (
        <>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput"/>
                        <div
                            onClick={() => {
                                setCurrentChat({
                                    members: [1, 2]
                                })
                            }}
                        >
                            <FriendPin/>
                        </div>
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div>
                                            {/*<Message message={m} own={m.sender === user._id}/>*/}
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                  <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                  />
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}

export default ChatContainer;