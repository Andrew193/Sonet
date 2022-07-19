import dateHelper from "../helpers/dateHelper";
import {AiOutlineDelete, AiOutlineEdit, FiCopy} from "react-icons/all";
import {Avatar, Tooltip} from "@mui/material";
import {useCallback, useContext} from "react";
import {copyToClipboard, deleteMessageById} from "./chatHelper";
import Context from "../helpers/contextHelper";

const actionsConfig = [
    {label: "Copy to buffer", icon: <FiCopy/>, type: "copy", onClick: ({messageText}) => copyToClipboard(messageText)},
    {
        label: "Delete the message",
        icon: <AiOutlineDelete/>,
        type: "delete",
        onClick: ({id}, socket, receiverId) => deleteMessageById(id, socket, receiverId)
    },
    {
        label: "Edit the message", icon: <AiOutlineEdit/>, type: "edit", onClick: () => {
        }
    }
]

function Message(props) {
    const {
        message,
        own,
        avatar,
        receiverId
    } = props;

    const {socket} = useContext(Context);

    const actions = useCallback(() => {
        return message => actionsConfig?.map((action) => {
            if (action?.type !== "copy" && own === false) {
                return null
            }

            return <Tooltip title={action?.label}>
                <button
                    id={"dropStylesForMessagesActions"}
                    onClick={() => {
                        action?.onClick(message, socket, receiverId)
                    }}
                >
                    {action?.icon}
                </button>
            </Tooltip>
        })
    }, [own])()

    console.log(actions)

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <Avatar
                    src={avatar}
                    className={"conversationImg"}
                />
                <p className="messageText">
                    {message.text || message?.messageText}
                    <div className={"chatActionsBar"}>
                        {actions(message)}
                    </div>
                </p>
            </div>
            <div className="messageBottom">{dateHelper.fromNow(message.createdAt)}</div>
        </div>
    )
}

export default Message;