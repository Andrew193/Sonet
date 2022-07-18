import {useEffect, useState} from "react";
import {getUserAvatar} from "../posts/PostItem";
import FriendPin from "./FriendPin";

function MatePin(props) {
    const {
        currentChat,
        friend,
        setCurrentChat,
        index
    } = props;

    const userInformation = JSON.parse(localStorage.getItem("userInfo"));
    const [userAvatar, setUserAvatar] = useState();

    useEffect(() => {
        if (userInformation?.id) {
            getUserAvatar(userAvatar, setUserAvatar, userInformation?.id === friend?.receiverId ? friend?.requestSendById : friend?.receiverId);
        }
    }, [userInformation])

    return (
        <div
            className={currentChat?.currentIndex === index ? "currentChat" : ""}
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
                userAvatar={userAvatar}
                friendName={friend?.receiverName}
                approved={friend?.approved}
            />
        </div>
    )
}

export default MatePin;