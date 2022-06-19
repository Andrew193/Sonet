import s from "./users.module.css"
import Script from "./script"
import {toast} from "react-toastify"
import {buttonsConfig} from "../createPost/CreatePostLine";

function UsersPageActions(props) {
    const {
        value,
        history,
        notYouFolCount,
        settings
    } = props;

    const userInformation = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <div className={s.ActionLine}>
            <button
                onClick={() => {
                    Script.openUserProfile(value, history)
                }}
                className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
            >Open profile
            </button>
            <button
                onClick={() => {
                    Script.Subscribe(value, toast, notYouFolCount)
                }}
                className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
            >Subscribe
            </button>
            <button
                onClick={() => {
                    Script.friendRequest({
                        receiverId: +value,
                        requestSendById: +userInformation?.id
                    })
                }}
                className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
            >
                Friend request
            </button>
        </div>
    )
}

export default UsersPageActions;