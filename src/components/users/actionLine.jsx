import s from "./style.module.css"
import Script from "./script"
import { toast } from "react-toastify"
function ActionLine(props) {
    const { value, history, myId, youFolCount, notYouFolCount } = props
    console.log(myId, youFolCount, notYouFolCount);
    return (
        <div className={s.ActionLine}>
            <button onClick={() => Script.openUserPofile(value, history)} className={"button"}>Open profile</button>
            <button onClick={() => Script.Subscribe(value, myId, youFolCount,toast,notYouFolCount)} className={"button"}>Subscribe</button>
        </div>
    )
}

export default ActionLine;