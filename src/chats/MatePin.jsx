import {useEffect, useState} from "react";
import FriendPin from "./FriendPin";
import {getUserAvatar} from "../posts/postsHelper";
import {getItemFromLocalStorage} from "../localStorageService";
import {USER_INFORMATION} from "../vars";

function MatePin(props) {
    const {
        currentChat,
        friend,
        setCurrentChat,
        index,
        setConversations
    } = props;

    const userInformation = getItemFromLocalStorage(USER_INFORMATION);
    const [userAvatar, setUserAvatar] = useState();

    useEffect(() => {
        if (userInformation?.id) {
            getUserAvatar(userAvatar, setUserAvatar, userInformation?.id === friend?.receiverId ? friend?.requestSendById : friend?.receiverId);
        }
    }, [userInformation])

    return (
        <div
            className={currentChat?.currentIndex === index ? "currentChat" : ""}
            onClick={(e) => {
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
                {...friend}
                userAvatar={userAvatar}
                friendName={friend?.receiverName}
                approved={friend?.approved}
                setConversations={setConversations}
            />
        </div>
    )
}

export default MatePin;