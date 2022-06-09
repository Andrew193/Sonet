import { createPortal } from "react-dom";
import CreatePost from "../components/createPost";
import s from "./index.module.css"
import Script from "../components/profile/script";

function PostPortal() {
    return createPortal(
        <div className={s.PostModal + " " + "Hide Mpost"} onDoubleClick={() => Script.openModal("Mpost")}>
            <div>
                <CreatePost />
            </div>
        </div>
        , document.body)
}
export default PostPortal;