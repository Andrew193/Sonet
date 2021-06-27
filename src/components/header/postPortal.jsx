import { createPortal } from "react-dom";
import CreatePost from "../createPost";
import s from "./index.module.css"
import Script from "../profile/script";
import { useContext } from "react";
import Context from "../../helpers/contextHelper"
function PostPortal(props) {
    const ContextValue = useContext(Context)
    console.log(ContextValue);
    const { notify, socket } = props;
    return createPortal(
        <div className={s.PostModal + " " + "Hide Mpost"} onDoubleClick={() => Script.openModal("Mpost")}>
            <div>
                <CreatePost notify={notify} socket={socket} />
            </div>
        </div>
        , document.body)
}
export default PostPortal;