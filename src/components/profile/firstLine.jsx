import s from "./style.module.css"
import Script from "./script.js"
import {AiOutlineHighlight} from "react-icons/ai";
function FirstLine() {
    return (
        <div className={s.FirstLine}>
            <img alt={"Avatar"}></img>
            <button onClick={() => Script.openModal("Muser")}>
                <AiOutlineHighlight className={s.CommonIcon} />Set up profile
            </button>
        </div>
    )
}
export default FirstLine;