import React from "react";
import {rejectFriendRequest} from "../chats/chatHelper";
import {notify} from "../App";
import {ImCancelCircle} from "react-icons/all";
import LazyImage from "../posts/LazyImage";
import {useEffect, useState} from "react";
import {getUserAvatar} from "../posts/postsHelper";

type FriendPinProps = {
    index: number,
    setConversations: (parameter: (parameter: FriendTypeForConversations[]) => any) => any,
    setCurrentChat: React.Dispatch<React.SetStateAction<any | null>>,
    receiverName?: string,
    receiverId: number,
    requestSendById?: any,
    userId: number,
}

export type FriendTypeForConversations = Pick<FriendPinProps, "receiverId"> & {
    [key: string]: any
}

function FriendPin(props: FriendPinProps) {
    const {
        index,
        setConversations,
        receiverId,
        requestSendById,
        receiverName,
        userId,
        setCurrentChat
    } = props;

    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        getUserAvatar(avatar, setAvatar, userId === receiverId ? requestSendById : receiverId)
    }, [userId, receiverId, requestSendById]);

    return (
        <>
            <div
                className={`conversation`}
                onClick={() => {
                    setCurrentChat({
                        members: [+receiverId, +(requestSendById || 0)],
                        id: `${[receiverId, requestSendById].sort((a, b): number => (a && b) ? a - b : 0).join("")}`,
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
                                    setConversations((state: FriendTypeForConversations[]) => JSON.parse(JSON.stringify(state?.filter((friend): boolean => friend?.receiverId !== receiverId))))
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
                    key={avatar}
                    imgClass={"conversationImg"}
                />
                <span className="conversationName">{receiverName}</span>
            </div>
        </>
    )
}

export default FriendPin;