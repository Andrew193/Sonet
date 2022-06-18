import s from "./users.module.css"
import Script from "./script"
import { toast } from "react-toastify"
import {buttonsConfig} from "../createPost/CreatePostLine";

function UsersPageActions(props) {
    const {
        value,
        history,
        notYouFolCount,
        settings
    } = props;

    return (
        <div className={s.ActionLine}>
            <button
                onClick={() => {
                    Script.openUserProfile(value, history)
                }}
                className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
            >Open profile</button>
            <button
                onClick={() => {
                    Script.Subscribe(value, toast, notYouFolCount)
                }}
                className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
            >Subscribe</button>
        </div>
    )
}

export default UsersPageActions;