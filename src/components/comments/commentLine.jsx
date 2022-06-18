import {useContext, useRef} from "react";
import s from "./comments.module.css"
import Script from "./Script.js"
import Context from "../../helpers/contextHelper"
import {buttonsConfig} from "../../createPost/CreatePostLine";

function CommentLine(props) {
    const {
        id,
        comCount,
        settings
    } = props;

    const {socket, notify} = useContext(Context);

    let input = useRef();

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    return (
        <div className={s.CommentLine}>
            <textarea ref={(el) => input = el}/>
            <button
                className={`button ${buttonsConfig[settings?.configs?.color[settings?.color]]}`}
                onClick={() => {
                    Script.createComment(input.value, userInfo, id, comCount, notify, socket)
                }}
            >Comment
            </button>
        </div>
    )
}

export default CommentLine;