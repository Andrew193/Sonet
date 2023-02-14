import {useEffect, useState} from "react";
import FriendPin from "./FriendPin";
import {getUserAvatar} from "../posts/postsHelper";
import {getItemFromLocalStorage} from "../localStorageService";
import {USER_INFORMATION} from "../vars";
import React from "react";
import PropTypes from "prop-types";

function MatePin(props) {
    const {
        currentChat,
        friend,
        setCurrentChat,
        index,
        setConversations,
        usersInChat
    } = props;

    const userInformation = getItemFromLocalStorage(USER_INFORMATION);
    const [userAvatar, setUserAvatar] = useState();
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        if (userInformation?.id) {
            const friendId = userInformation?.id === friend?.receiverId ? friend?.requestSendById : friend?.receiverId;
            setIsOnline(() => usersInChat?.filter((user) => user?.userId === friendId)[0])
            getUserAvatar(userAvatar, setUserAvatar, friendId);
        }
    }, [userInformation])

    return (
        <div
            className={`${currentChat?.currentIndex === index ? "currentChat" : ""}`}
            onClick={() => {
                if (friend?.approved) {
                    setCurrentChat({
                        members: [+friend?.receiverId, +friend?.requestSendById],
                        id: `${[friend?.receiverId, friend?.requestSendById].sort((a, b) => a - b).join("")}`,
                        currentIndex: index
                    })
                }
            }}
        >
            <FriendPin
                {...friend}
                userAvatar={userAvatar}
                isOnline={isOnline}
                friendName={friend?.receiverName}
                approved={friend?.approved}
                setConversations={setConversations}
            />
        </div>
    )
}

MatePin.propTypes = {
    currentChat: PropTypes.object,
    friend: PropTypes.any,
    setCurrentChat: PropTypes.func,
    index: PropTypes.number,
    setConversations: PropTypes.func,
    usersInChat: PropTypes.array
};

export default MatePin;