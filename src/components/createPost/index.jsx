import s from "./index.module.css"
import Script from "./script"
import { useContext, useRef } from "react";
import Context from "../../helpers/contextHelper"
function CreatePost() {
    let text = useRef();
    let image = useRef();
    const { socket, notify } = useContext(Context)
    return (
        <div className={s.Container}>
            <form>
                <input ref={(el) => image = el} type="file" style={{display:"none"}}></input>
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