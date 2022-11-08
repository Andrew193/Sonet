import dateHelper from "../helpers/dateHelper";
import {AiOutlineDelete, AiOutlineEdit, FiCopy} from "react-icons/all";
import {Avatar, Tooltip} from "@mui/material";
import {useCallback, useContext, useState} from "react";
import {copyToClipboard, deleteMessageById} from "./chatHelper";
import {Context, notify} from "../App";
import UpdateChatMessageModal from "./UpdateChatMessageModal";

const actionsConfig = [
    {label: "Copy to buffer", icon: <FiCopy/>, type: "copy", onClick: ({messageText}) => copyToClipboard(messageText)},
    {
        label: "Delete the message",
        icon: <AiOutlineDelete/>,
        type: "delete",
        onClick: ({id}, socket, receiverId, setMessages) => {
            deleteMessageById(id, socket, receiverId)
                .then(() => {
                    notify("Deleted");
                    setMessages((state) => JSON.parse(JSON.stringify(state?.filter((message) => message?.id !== id))))
                });
        }
    },
    {
        label: "Edit the message",
        icon: <AiOutlineEdit/>,
        type: "edit",
        onClick: ({id}, socket, receiverId, setMessages, setIsOpened, setMessageToUpdateId) => {
            setIsOpened(() => true);
            setMessageToUpdateId(() => id)
        }
    }
]

function Message(props) {
    const {
        message,
        own,
        avatar,
        receiverId,
        setMessages
    } = props;

    const {socket} = useContext(Context);
    const [isOpened, setIsOpened] = useState(false);
    const [messageToUpdateId, setMessageToUpdateId] = useState();

    const actions = useCallback(() => {
        return message => actionsConfig?.map((action, index) => {
            if (action?.type !== "copy" && own === false) {
                return null
            }

            return <Tooltip title={action?.label} key={index}>
                <button
                    id={"dropStylesForMessagesActions"}
                    onClick={() => action?.onClick(message, socket, receiverId, setMessages, setIsOpened, setMessageToUpdateId)}
                >
                    {action?.icon}
                </button>
            </Tooltip>
        })
    }, [own])()

    return (
        <div className={own ? "message own" : "message"}>
            <UpdateChatMessageModal
                setMessages={setMessages}
                receiverId={receiverId}
                socket={socket}
                isOpened={isOpened}
                setIsOpened={setIsOpened}
                notify={notify}
                messageToUpdateId={messageToUpdateId}
            />
            <div className="messageTop">
                <Avatar
                    src={avatar}
                    className={"conversationImg"}
                />
                <p className="messageText">
                    {message.text || message?.messageText}
                    <div className={"chatActionsBar"}>
                        {actions(message)}
                        <span className="messageBottom">{dateHelper.fromNow(message.createdAt)}</span>
                    </div>
                </p>
            </div>
        </div>
    )
}

export default Message;