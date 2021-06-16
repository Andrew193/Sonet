import { createPortal } from "react-dom";
import CreatePost from "../createPost";
import s from "./index.module.css"
import { openModal } from "../profile/script";
function PostPortal(props) {
    const { notify, socket } = props;
    return createPortal(
        <div className={s.PostModal + " " + "Hide Mpost"} onDoubleClick={() => openModal("Mpost")}>
            <div>
                <CreatePost notify={notify} socket={socket} />
            </div>
        </div>
        , document.body)
}
export default PostPortal;