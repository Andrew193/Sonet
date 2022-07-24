import {rejectFriendRequest} from "../chats/chatHelper";
import {notify} from "../App";
import {ImCancelCircle} from "react-icons/all";
import LazyImage from "../posts/LazyImage";
import {useEffect, useState} from "react";
import {getUserAvatar} from "../posts/PostItem";


function FriendPin(props) {
    const {
        index,
        setConversations,
        receiverId,
        requestSendById,
        receiverName,
        userId,
        setCurrentChat
    } = props;

    const [avatar, setAvatar] = useState(null);

    useEffect(() => getUserAvatar(avatar, setAvatar, userId === receiverId ? requestSendById : receiverId)
        , [userId, receiverId, requestSendById]);

    return (
        <>
            <div
                className={`conversation`}
                onClick={() => {
                    setCurrentChat({
                        members: [+receiverId, +requestSendById],
                        id: `${[receiverId, requestSendById].sort(function (a, b) {
                            return a - b;
                        }).join("")}`,
                        currentIndex: index
                    })
                }}
            >
                    <span
                        className={"deleteExistingFriend"}
                        onClick={(e) => {
                            e.stopPropagation();

                            rejectFriendRequest({
                                receiverId,
                                requestSendById
                            })
                                .then(() => {
                                    notify("Deleted successfully");
                                    setConversations((state) => {
                                        return JSON.parse(JSON.stringify(state?.filter((friend) => {
                                            return friend?.receiverId !== receiverId
                                        })))
                                    })
                                });
                            rejectFriendRequest({
                                receiverId: requestSendById,
                                requestSendById: receiverId
                            });
                        }}
                    >
                    <ImCancelCircle
                        style={{
                            color: "red"
                        }}
                    />
                </span>
                <LazyImage
                    imageSrc={avatar}
                    onClick={() => {
                    }}
                    key={avatar}
                    imgClass={"conversationImg"}
                />
                <span className="conversationName">{receiverName}</span>
            </div>
        </>
    )
}

export default FriendPin;