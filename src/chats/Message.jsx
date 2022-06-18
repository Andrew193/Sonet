import dateHelper from "../helpers/dateHelper";
import {FiCopy} from "react-icons/all";


function Message(props) {
    const {
        message,
        own
    } = props;

    return(
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
                    <FiCopy />
                </div>
                </p>
            </div>
            <div className="messageBottom">{dateHelper.fromNow(message.createdAt)}</div>
        </div>
    )
}

export default Message;