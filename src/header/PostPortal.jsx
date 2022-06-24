import {createPortal} from "react-dom";
import CreatePost from "../createPost/CreatePostLine";
import s from "./header.module.css"
import Script from "../components/profile/profileHelper";

function PostPortal() {

    return createPortal(
        <div
            className={s.PostModal + " Hide Mpost"}
            onDoubleClick={() => {
                Script.openModal("Mpost")
            }}
        >
            <div>
                <CreatePost/>
            </div>
        </div>
        , document.body)
}

export default PostPortal;