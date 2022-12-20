import React from "react";
import {createPortal} from "react-dom";
import CreatePost from "../create-post/CreatePostLine";
import s from "./header.module.css"
import Script from "../components/profile/profileHelper";

function PostPortal() {

    return createPortal(
        <div
            className={s.PostModal + " Hide Mpost"}
            onDoubleClick={() => {
                window?.document?.body?.querySelector(".App")?.classList?.remove("Open")
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