import s from "./users.module.css"
import Script from "./script"
import { toast } from "react-toastify"
function UsersPageActions(props) {
    const { value, history, notYouFolCount } = props
    return (
        <div className={s.ActionLine}>
            <button onClick={() => Script.openUserPofile(value, history)} className={"button"}>Open profile</button>
            <button onClick={() => Script.Subscribe(value, toast, notYouFolCount)} className={"button"}>Subscribe</button>
        </div>
    )
}

export default UsersPageActions;