import {AiOutlineLock, ImCancelCircle, IoAddSharp} from "react-icons/all";
import {approveFriendRequest, rejectFriendRequest} from "./chatHelper";
import {notify} from "../App";
import {toast} from "react-toastify";
import {friendRequest} from "../users/script";
import {createCopy} from "../utils";
import LazyImage from "../posts/LazyImage";

function FriendPin(props) {
    const {
        friendName,
        approved,
        requestMode,
        receiverId,
        requestSendById,
        setConversations,
        setPossibleMates,
        id,
        userAvatar
    } = props;

    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

    function actionsCover(flag) {
        setPossibleMates((state) => {
            const copy = createCopy(state);

            if (flag) {
                setConversations((state) => {
                    return [...(state || []), {...copy[id], approved: true}]
                })
            }

            copy.splice(id, 1)
            return copy;
        })
    }

    return (
        <>
            <div className={`conversation ${!approved ? "closedFriendPin" : ""} ${requestMode ? "closedFriendPin" : ""}`}>
                {
                    approved &&
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
                }
                <LazyImage imageSrc={userAvatar} onClick={() => {
                }} imgClass={"conversationImg"}/>
                <span className="conversationName">{friendName}</span>
                {
                    !approved
                    && <AiOutlineLock
                        className={"lockedFriendPin"}
                    />
                }

                {
                    !requestMode
                    && <span className={`${!approved ? "approvalIsRequired" : "hide"}`}>Approval Is Required</span>
                }
            </div>

            {
                requestMode
                &&
                <div className={"matesActions"}>
                    <span
                        onClick={() => {
                            rejectFriendRequest({
                                receiverId,
                                requestSendById
                            }, notify, notify);

                            actionsCover();
                        }}
                    >
                        <ImCancelCircle
                            style={{
                                color: "red"
                            }}
                        />
                        Reject
                    </span>
                    <span
                        onClick={() => {
                            approveFriendRequest({
                                receiverId,
                                requestSendById
                            }, notify, notify)
                            friendRequest({
                                receiverId: requestSendById,
                                requestSendById: receiverId,
                                receiverName: userInformation?.userName,
                                requesterName: friendName,
                                userAvatarLink: "/",
                                approved: true
                            }, toast)

                            actionsCover(true)
                        }}
                    >
                        <IoAddSharp
                            style={{
                                color: "green"
                            }}
                        />
                        Approve
                    </span>
                </div>
            }
        </>
    )
}

export default FriendPin;