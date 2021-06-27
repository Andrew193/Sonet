import { useContext, useRef } from "react";
import s from "./style.module.css"
import Script from "./Script.js"
import Context from "../../helpers/contextHelper"

function CommentLine(props) {
    const { socket, notify } = useContext(Context)
    const { id, comCount } = props
    let input = useRef();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    return (
        <div className={s.CommentLine}>
            <textarea ref={(el) => input = el} />
            <button className={"button"} onClick={() => Script.createComment(input.value, userInfo, id, comCount,notify,socket)}>Comment</button>
        </div>
    )
}
export default CommentLine;