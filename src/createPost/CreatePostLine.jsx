import s from "./create-post.module.css"
import Script from "./script"
import {useContext, useMemo, useRef, useState} from "react";
import Context from "../helpers/contextHelper"
import {AiOutlineClose, BiImageAdd, BsPencil} from "react-icons/all";
import userHelper from "../helpers/userHelper";
import {Avatar, Backdrop, Box, CircularProgress} from "@mui/material";

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

    let text = useRef();
    let image = useRef();

    const [images, setImages] = useState([]);
    const [isOpened, setIsOpened] = useState(false);

    const {socket, notify} = useContext(Context);

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
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isOpened}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <form>
                <input
                    ref={(el) => image = el}
                    type="file"
                    style={{display: "none"}}
                    onChange={() => {
                        Script.createBlob((blob) => {
                            console.log(blob)
                            setImages((state) => [...state, {
                                file: image.files[0],
                                blobUrl: blob
                            }])
                        }, image.files[0])
                    }}
                />
            </form>
            <textarea
                ref={(el) => text = el}
                className={s.InputPostText}
                placeholder={"Input your post text"}
                style={{
                    fontSize: customStyle?.fontSize
                }}
            />
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
                    Attach image
                </button>
                <button
                    className={`button btn btn-default ${buttonsConfig[customStyle?.color]}`}
                    onClick={() => {
                        window?.document?.body?.querySelector(".App")?.classList?.remove("Open")
                        Script.CreatePost(text.value, notify, text, socket, images)
                    }}
                >
                    <BsPencil/>
                    Create Post
                </button>
            </p>
        </div>
    )
}

export default CreatePost;