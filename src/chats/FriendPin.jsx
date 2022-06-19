import {Avatar} from "@mui/material";
import {AiOutlineLock, ImCancelCircle, IoAddSharp} from "react-icons/all";
import {approveFriendRequest} from "./chatHelper";
import {notify} from "../App";


function FriendPin(props) {
    const {
        friendName,
        approved,
        requestMode,
        receiverId,
        requestSendById
    } = props;

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
                <AiOutlineLock
                    className={"lockedFriendPin"}
                />

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
                    <span>
                        <ImCancelCircle
                            style={{
                                color: "red"
                            }}
                        />
                        Cancel
                    </span>
                    <span
                        onClick={() => {
                            approveFriendRequest({
                                receiverId,
                                requestSendById
                            }, notify, notify)
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