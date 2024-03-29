import React from "react";
import {useForm} from "usetheform";
import CreatePostHelper from "../../../create-post/CreatePostHelper";
import {BsPencil} from "react-icons/all";
import {buttonsConfig} from "../../../create-post/CreatePostLine";
import {useContext, useEffect} from "react";
import {useTranslation} from "react-i18next";
import {setPostInformation} from "../../../app/postReducer";
import {useDispatch, useSelector} from "react-redux";
import {getStore} from "../../../app/store";
import {Context} from "../../../App";
import PropTypes from "prop-types";

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
    const postInformation = useSelector((store) => store.post.postInformation)

    return (
        <button
            disabled={disabled}
            style={{
                margin: "0px 5px 5px 0px"
            }}
            className={`button btn btn-default ${buttonsConfig[customStyle?.color]}`}
            onClick={() => {
                setIsOpened(true);
                window?.document?.body?.querySelector(".App")?.classList?.remove("Open")
                CreatePostHelper.CreatePost(text, notify, null, socket, images, postInformation)
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

PostButton.propTypes = {
    disabled: PropTypes.bool,
    customStyle: PropTypes.object,
    setIsOpened: PropTypes.func,
    text: PropTypes.string,
    images: PropTypes.array,
    setImages: PropTypes.func
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

Submit.propTypes = {
    customStyle: PropTypes.object,
    setIsOpened: PropTypes.func,
    images: PropTypes.array,
    setImages: PropTypes.func
}