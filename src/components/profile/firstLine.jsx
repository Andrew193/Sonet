import s from "./style.module.css"
import Script from "./script.js"
import { AiOutlineHighlight } from "react-icons/ai";
import UserHelper from "../../helpers/userHelper"
import { useRef } from "react";
function FirstLine(props) {
    let image = useRef();
    const { imgUrl, myId, id } = props;
    return (
        <>
            <form>
                <input ref={(el) => image = el} onChange={()=>UserHelper.updateAvatar(image)} type="file"
                    style={{ display: "none" }}></input>
            </form>
            <div className={s.FirstLine}>
                <img alt={"Avatar"} src={imgUrl} onClick={() => (myId === id) && UserHelper.CallImageInput(image)}></img>
                {myId === id && <button onClick={() => Script.openModal("Muser")}>
                    <AiOutlineHighlight className={s.CommonIcon} />Set up profile
                </button>}
            </div>
        </>)
}
export default FirstLine;