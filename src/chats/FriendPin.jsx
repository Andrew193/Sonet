import {Avatar} from "@mui/material";


function FriendPin(props) {
    const {
        friendName
    } = props;

    return(
        <div className="conversation">
            <Avatar
                src={""}
                className={"conversationImg"}
            >
                {friendName[0]}
            </Avatar>
            <span className="conversationName">{friendName}</span>
        </div>
    )
}

export default FriendPin;