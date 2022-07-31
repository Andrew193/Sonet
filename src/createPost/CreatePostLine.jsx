import s from "./create-post.module.css"
import Script from "./script"
import {useContext, useMemo, useRef, useState} from "react";
import Context from "../helpers/contextHelper"
import {AiOutlineClose, BiImageAdd, BsPencil} from "react-icons/all";
import userHelper from "../helpers/userHelper";
import {Avatar, Backdrop, Box, CircularProgress} from "@mui/material";
import {useTranslation} from "react-i18next";
import MainCover from "../components/solid-textarea/MainCover";

export const buttonsConfig = {
    "#FF0000": s.RedButton,
    "#FFA500": s.YellowButton,
    "#008000": s.GreenButton,
    "#0a00ce": s.BlueButton,
    "#FF7F50": s.CoralButton,
    "#bd9d33": s.GoldButton,
    "#2177e8": s.SkyButton,
    "#b32dd2": s.PurpleButton
}

function CreatePost(props) {
    const {
        customStyle
    } = props;

    const {t} = useTranslation();
    let image = useRef();

    const [images, setImages] = useState([]);
    const [isOpened, setIsOpened] = useState(false);

    const {socket} = useContext(Context);

    const previewImages = useMemo(() =>
        images?.map((image, index) =>
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
                    ref={(el) => image = el}
                    type="file"
                    style={{display: "none"}}
                    onChange={() => {
                        Script.createBlob((blob) => {
                            setImages((state) => [...state, {
                                file: image.files[0],
                                blobUrl: blob
                            }])
                        }, image.files[0])
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
                        userHelper.CallImageInput(image)
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