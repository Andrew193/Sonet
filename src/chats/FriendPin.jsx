import {Avatar} from "@mui/material";
import {AiOutlineLock} from "react-icons/all";


function FriendPin(props) {
    const {
        friendName,
        approved
    } = props;

    return (
        <div
            className={`conversation ${!approved ? "closedFriendPin" : ""}`}
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
            <span
                className={`${!approved ? "approvalIsRequired" : "hide"}`}
            >Approval Is Required</span>
        </div>
    )
}

export default FriendPin;