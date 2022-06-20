import {Avatar} from "@mui/material";
import {AiOutlineLock, ImCancelCircle, IoAddSharp} from "react-icons/all";
import {approveFriendRequest, rejectFriendRequest} from "./chatHelper";
import {notify} from "../App";
import {toast} from "react-toastify";
import {friendRequest} from "../users/script";
import {createCopy} from "../utils";


function FriendPin(props) {
    const {
        friendName,
        approved,
        requestMode,
        receiverId,
        requestSendById,
        setConversations,
        setPossibleMates,
        id
    } = props;

    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <>
            <div
                className={`conversation ${!approved ? "closedFriendPin" : ""} ${requestMode ? "closedFriendPin" : ""}`}
            >
                <Avatar
                    src={""}
                    className={"conversationImg"}
                >
                    {friendName[0]}
                </Avatar>
                <span className="conversationName">{friendName}</span>
                {
                    !approved
                    && <AiOutlineLock
                        className={"lockedFriendPin"}
                    />
                }

                {
                    !requestMode
                    && <span
                        className={`${!approved ? "approvalIsRequired" : "hide"}`}
                    >Approval Is Required</span>
                }
            </div>

            {
                requestMode
                &&
                <div
                    className={"matesActions"}
                >
                    <span
                        onClick={() => {
                            rejectFriendRequest({
                                receiverId,
                                requestSendById
                            }, notify, notify)
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

                            setPossibleMates((state) => {
                                const copy = createCopy(state);

                                setConversations((state) => {
                                    return [...(state || []), copy[id]]
                                })

                                copy.splice(id, 1)
                                return copy;
                            })
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