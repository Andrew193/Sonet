import s from "./index.module.css"
import Script from "./script"
import { useRef } from "react";
function CreatePost(props) {
    let text = useRef();
    let image = useRef();
    const { notify, socket } = props
    return (
        <div className={s.Container}>
            <form>
                <input ref={(el) => image = el} type="file"></input>
            </form>
            <textarea ref={(el) => text = el} className={s.InputPostText} placeholder={"Input your post text"} ></textarea>
            <p>
                <button className={"button"} onClick={() => Script.AddImage(image)}>Attach image</button>
                <button className={"button"} onClick={() => Script.CreatePost(text.value, notify, text, socket, image)}>Create Post</button>
            </p>
        </div>
    )
}
export default CreatePost;