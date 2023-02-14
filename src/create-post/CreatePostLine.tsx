import React from "react";
import createPostStyles from "./create-post.module.css"
import CreatePostHelper from "./CreatePostHelper"
import {useMemo, useRef, useState} from "react";
import {AiOutlineClose, BiImageAdd} from "react-icons/all";
import userHelper from "../helpers/userHelper";
import {Avatar, Backdrop, Box, CircularProgress} from "@mui/material";
import {useTranslation} from "react-i18next";
import MainCover from "../components/solid-textarea/MainCover";
import {CustomStyleType} from "../main-page/configLine";

type buttonsConfigType = {
    [i: string | number]: any
}

export const buttonsConfig: buttonsConfigType = {
    "#FF0000": createPostStyles.RedButton,
    "#FFA500": createPostStyles.YellowButton,
    "#008000": createPostStyles.GreenButton,
    "#0a00ce": createPostStyles.BlueButton,
    "#FF7F50": createPostStyles.CoralButton,
    "#bd9d33": createPostStyles.GoldButton,
    "#2177e8": createPostStyles.SkyButton,
    "#b32dd2": createPostStyles.PurpleButton
}

type CreatePostType = {
    customStyle: CustomStyleType
}

type ImageType = { file: File | undefined | null, blobUrl: string }

function CreatePost(props: CreatePostType) {
    const {
        customStyle
    } = props;

    const {t} = useTranslation();
    const image = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<ImageType[]>([]);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const previewImages = useMemo(() =>
        images?.map((image: ImageType, index: number) =>
            <div key={index}>
                <Avatar src={image?.blobUrl} key={image?.blobUrl}/>
                <span
                    onClick={() => {
                        const imgCopy = JSON.parse(JSON.stringify(images));
                        imgCopy?.splice(index, 1);

                        setImages(imgCopy)
                    }}
                    className={createPostStyles.CloseBtn}
                >
                    <AiOutlineClose/>
                </span>
            </div>
        ), [images?.length])

    return (
        <div className={createPostStyles.Container}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isOpened || false}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
            <MainCover
                customStyle={customStyle}
                setIsOpened={setIsOpened}
                images={images}
                setImages={setImages}
            />
            <form>
                <input
                    ref={image}
                    type="file"
                    style={{display: "none"}}
                    onChange={() => {
                        CreatePostHelper.createBlob((blob: string) => {
                            setImages((state: ImageType[]) => [...state, {
                                file: image?.current?.files![0],
                                blobUrl: blob
                            }])
                        }, (image?.current as HTMLInputElement)?.files![0])
                    }}
                />
            </form>
            <Box className={createPostStyles.ImagePreviewContainer}>
                {images?.length > 0 ? <>{previewImages}</> : null}
            </Box>
            <p>
                <button
                    className={`button btn btn-default ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => userHelper.CallImageInput(image?.current)}
                    disabled={previewImages?.length === 4}
                >
                    <BiImageAdd/>
                    {t("Attach image")}
                </button>
            </p>
        </div>
    )
}

export default CreatePost;