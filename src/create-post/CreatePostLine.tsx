import s from "./create-post.module.css"
import Script from "./script"
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
    "#FF0000": s.RedButton,
    "#FFA500": s.YellowButton,
    "#008000": s.GreenButton,
    "#0a00ce": s.BlueButton,
    "#FF7F50": s.CoralButton,
    "#bd9d33": s.GoldButton,
    "#2177e8": s.SkyButton,
    "#b32dd2": s.PurpleButton
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
    let image = useRef<HTMLInputElement>(null);

    const [images, setImages] = useState<ImageType[]>([]);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const previewImages = useMemo(() =>
        images?.map((image: ImageType, index: number) =>
            <div>
                <Avatar
                    src={image?.blobUrl}
                    key={image?.blobUrl}
                />
                <span
                    onClick={() => {
                        const imgCopy = JSON.parse(JSON.stringify(images));
                        imgCopy?.splice(index, 1);

                        setImages(imgCopy)
                    }}
                    className={s.CloseBtn}
                >
                    <AiOutlineClose/>
                </span>
            </div>
        ), [images?.length])

    return (
        <div className={s.Container}>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isOpened}
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
                        Script.createBlob((blob: string) => {
                            setImages((state: ImageType[]) => [...state, {
                                file: image?.current?.files![0],
                                blobUrl: blob
                            }])
                        }, (image?.current as HTMLInputElement)?.files![0])
                    }}
                />
            </form>
            <Box
                className={s.ImagePreviewContainer}
            >
                {
                    images?.length > 0
                        ? <>{previewImages}</>
                        : null
                }
            </Box>
            <p>
                <button
                    className={`button btn btn-default ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => {
                        userHelper.CallImageInput(image?.current)
                    }}
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