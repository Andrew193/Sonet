import {v4 as uuidv4} from "uuid";
import s from "./posts.module.css";
import {alpha, Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import EmotionsLineContainer from "./EmotionsLineContainer";
import profileHelper from "../components/profile/profileHelper";
import DataHelper from "../helpers/dateHelper";
import {useEffect, useState, useMemo} from "react";
import LazyImage from "./LazyImage";
import ImageViewer from "react-simple-image-viewer";
import {useCallback} from "react";


function PostItem(props) {
    const {
        value,
        id,
        settings
    } = props;

    const [userAvatar, setUserAvatar] = useState();
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const previewImages = useMemo(() => {
        if (JSON.parse(value?.savedImages)?.length) {
            return JSON.parse(value?.savedImages)?.map((img, index) =>
                <LazyImage
                    onClick={() => {
                        openImageViewer(index)
                    }}
                    imgClass={s.ImgPreview}
                    imageSrc={JSON.parse(img)?.webContentLink}
                    key={img}
                />
            )
        }
        return [];
    }, [value?.savedImages])

    useEffect(() => {
        async function getUserAvatar() {
            if (value?.userId && !userAvatar) {
                const response = await profileHelper.getUser(value?.userId);

                try {
                    setUserAvatar(JSON.parse(response?.data?.user?.avatar)?.webContentLink)
                } catch (error) {
                    setUserAvatar(response?.data?.user?.avatar)
                }
            }
        }

        getUserAvatar();
    }, [])

    const imagesForPreview = useMemo(() => JSON.parse(value?.savedImages)?.map((image) => JSON.parse(image)?.webContentLink)
        , [value?.savedImages])

    return (
        <>
            {isViewerOpen && (
                <ImageViewer
                    backgroundStyle={{
                        background: `${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.2)}`,
                        zIndex: 10
                    }}
                    key={imagesForPreview}
                    src={imagesForPreview}
                    currentIndex={currentImage}
                    disableScroll
                    closeOnClickOutside
                    onClose={closeImageViewer}
                />
            )}
            <div
                key={uuidv4()}
                className={s.Item + " itemsPostsPage"}
                data-id={value.id}
            >
                <Avatar
                    src={userAvatar}
                    style={{
                        height: '75px',
                        width: '75px',
                        marginRight: '15px',
                        borderRadius: '5px'
                    }}
                />
                <div
                    style={{
                        flex: '10 0',
                    }}
                >
                    <h3>
                        <Link
                            to={{pathname: `/users/${+value.userId}`}}
                            className={"authorName"}
                        >{value.createdBy}</Link>
                    </h3>
                    <p>{value.text}</p>
                    <div
                        className={s.ImagesContainer}
                    >
                        {previewImages}
                    </div>
                    <EmotionsLineContainer
                        value={value}
                        id={id}
                    />
                </div>
                <span className={s.Time}>{DataHelper.fromNow(value.createdAt)}</span>
            </div>
        </>
    )
}

export default PostItem;