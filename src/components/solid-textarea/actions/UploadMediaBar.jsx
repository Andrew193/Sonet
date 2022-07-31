import React from "react";
import { useForm } from "usetheform";
import s from "../solid-textarea.module.css";

export const UploadMediaBar = () => {
    const { state } = useForm();
    const disableUploadGif = state.media !== undefined;
    const disableUploadImgVideo = state.gif !== undefined;

    return (
        <div className={s.UploadMediaBar}>
            {/*<UploadImgVideo disabled={disableUploadImgVideo} />*/}
            {/*<UploadGif disabled={disableUploadGif} />*/}
            {/*<EmojiPicker />*/}
        </div>
    );
};
