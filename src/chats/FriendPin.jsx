import {Avatar} from "@mui/material";


function FriendPin() {


    return(
        <div className="conversation">
            <Avatar
                src={""}
                className={"conversationImg"}
            >
                T
            </Avatar>
            <span className="conversationName">user?.username</span>
        </div>
    )
}

export default FriendPin;