import React from "react";
import {useForm} from "usetheform";
import Script from "../../../createPost/script";
import {BsPencil} from "react-icons/all";
import {buttonsConfig} from "../../../createPost/CreatePostLine";
import {useContext, useEffect} from "react";
import Context from "../../../helpers/contextHelper";
import {useTranslation} from "react-i18next";
import {setPostInformation} from "../../../app/postReducer";
import {useDispatch} from "react-redux";
import {getStore} from "../../../app/store";

function PostButton(props) {
    const {
        disabled,
        customStyle,
        setIsOpened,
        text,
        images,
        setImages
    } = props;

    const {socket, notify} = useContext(Context);
    const {t} = useTranslation();

    return (
        <button
            disabled={disabled}
            className={`button btn btn-default ${buttonsConfig[customStyle?.color]}`}
            onClick={() => {
                setIsOpened(true);
                window?.document?.body?.querySelector(".App")?.classList?.remove("Open")
                Script.CreatePost(text, notify, null, socket, images)
                    .then(() => {
                        const dispatch = getStore().dispatch;
                        dispatch(setPostInformation({shouldClear: true}))
                        setImages([]);
                        setIsOpened(false);
                    })
            }}
        >
            <BsPencil/>
            {t("Create Post")}
        </button>
    )
}

export const Submit = (props) => {
    const {
        customStyle,
        setIsOpened,
        images,
        setImages
    } = props;

    const dispatch = useDispatch();
    const {isValid, pristine, state} = useForm();
    const isEmpty = !state.editor?.plainText && !state.media && !state.gif;

    console.log(state)
    useEffect(() => {
        dispatch(setPostInformation({value: state?.editor?.plainText, length: state?.editor?.plainText?.length}))
    }, [state?.editor?.plainText])

    return (
        <PostButton
            customStyle={customStyle}
            setIsOpened={setIsOpened}
            images={images}
            text={state?.editor?.plainText}
            setImages={setImages}
            disabled={!isValid || pristine || isEmpty}
        />
    )
};
