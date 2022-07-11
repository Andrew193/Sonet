import dateHelper from "../helpers/dateHelper";
import {AiOutlineDelete, AiOutlineEdit, FiCopy} from "react-icons/all";
import {Avatar, Tooltip} from "@mui/material";
import {useMemo, useEffect, useState} from "react";
import profileHelper from "../components/profile/profileHelper";

const actionsConfig = [
    {label: "Copy to buffer", icon: <FiCopy/>, type: "copy"},
    {label: "Delete the message", icon: <AiOutlineDelete/>, type: "delete"},
    {label: "Edit the message", icon: <AiOutlineEdit/>, type: "edit"}
]

function Message(props) {
    const {
        message,
        own
    } = props;

    const [avatarUrl, setAvatarUrl] = useState("");

    const actions = useMemo(() => {
        return actionsConfig?.map((action) => {
            if (action?.type !== "copy" && own === false) {
                return null
            }

            return <Tooltip title={action?.label}>
                <button
                    id={"dropStylesForMessagesActions"}
                >
                    {action?.icon}
                </button>

            </Tooltip>

        })
    }, [own])

    useEffect(() => {
        async function getUserAvatar() {
            if (message?.createdById && !avatarUrl) {
                const response = await profileHelper.getUser(message?.createdById);

                try {
                    setAvatarUrl(JSON.parse(response?.data?.user?.avatar)?.webContentLink)
                } catch (error) {
                    setAvatarUrl(response?.data?.user?.avatar)
                }
            }
        }

        getUserAvatar();
    }, [message]);

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <Avatar
                    src={avatarUrl}
                    className={"conversationImg"}
                />
                <p className="messageText">
                    {message.text || message?.messageText}
                    <div className={"chatActionsBar"}>
                        {actions}
                    </div>
                </p>
            </div>
            <div className="messageBottom">{dateHelper.fromNow(message.createdAt)}</div>
        </div>
    )
}

export default Message;