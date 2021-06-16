import s from "./index.module.css"
import Script from "./script"
import { useRef } from "react";
function CreatePost(props) {
    let text = useRef();
    const { notify, socket } = props
    return (
        <div className={s.Container}>
            <textarea ref={(el) => text = el} className={s.InputPostText} placeholder={"Input your post text"} ></textarea>
            <p>
                <button className={"button"}>Attach image</button>
                <button className={"button"} onClick={() => Script.CreatePost(text.value, notify, text, socket)}>Create Post</button>
            </p>
        </div>
    )
}
export default CreatePost;