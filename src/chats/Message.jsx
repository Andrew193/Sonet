import dateHelper from "../helpers/dateHelper";
import {AiOutlineDelete, AiOutlineEdit, FiCopy} from "react-icons/all";
import {IconButton, Tooltip} from "@mui/material";
import {useMemo} from "react";

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

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
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