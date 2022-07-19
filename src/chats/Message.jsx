import dateHelper from "../helpers/dateHelper";
import {AiOutlineDelete, AiOutlineEdit, FiCopy} from "react-icons/all";
import {Avatar, Tooltip} from "@mui/material";
import {useMemo, useEffect, useState, useCallback} from "react";
import profileHelper from "../components/profile/profileHelper";
import {copyToClipboard, deleteMessageById} from "./chatHelper";

const actionsConfig = [
    {label: "Copy to buffer", icon: <FiCopy/>, type: "copy", onClick: ({messageText}) => copyToClipboard(messageText)},
    {
        label: "Delete the message", icon: <AiOutlineDelete/>, type: "delete", onClick: ({id}) => deleteMessageById(id)
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
        avatar
    } = props;

    const actions = useCallback(() => {
        return message => actionsConfig?.map((action) => {
            if (action?.type !== "copy" && own === false) {
                return null
            }

            return <Tooltip title={action?.label}>
                <button
                    id={"dropStylesForMessagesActions"}
                    onClick={() => {
                        action?.onClick(message)
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