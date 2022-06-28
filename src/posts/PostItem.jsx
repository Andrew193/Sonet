import s from "./posts.module.css";
import {alpha, Avatar, Box, hexToRgb, ListItemIcon, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import EmotionsLineContainer from "./EmotionsLineContainer";
import profileHelper from "../components/profile/profileHelper";
import DataHelper from "../helpers/dateHelper";
import {useEffect, useState, useMemo, useCallback, useRef} from "react";
import ImageViewer from "react-simple-image-viewer";
import {BsThreeDots} from "react-icons/all";
import {AiOutlineDownload} from "react-icons/ai";
import {createFile, downloadFile} from "../utils";
import {useOutsideClick} from "../hooks";
import PostItemsImages from "./PostItemsImages";
import React from "react";
import { downloadZip } from "client-zip/index.js"
import FileSaver from "file-saver"

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
        , [])

    const [anchorEl, setAnchorEl] = useState(null);
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => {
        handleClose();
    })

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {
                isViewerOpen && (
                    <ImageViewer
                        backgroundStyle={{
                            background: `${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.2)}`,
                            zIndex: 10
                        }}
                        key={currentImage}
                        src={imagesForPreview}
                        currentIndex={currentImage}
                        disableScroll
                        closeOnClickOutside
                        onClose={closeImageViewer}
                    />
                )}
            <div
                className={s.Item + " itemsPostsPage"}
                data-id={value.id}
            >
                <Avatar
                    src={userAvatar}
                    style={{
                        height: '75px',
                        width: '75px',
                        marginRight: '15px',
                        borderRadius: '5px',
                        boxShadow: `0px 0px 8px 0px ${alpha(hexToRgb(settings?.configs?.color[settings?.color] || "rgb(0,0,0)"), 0.8)}`
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
                    <PostItemsImages
                        valueSavedImages={value?.savedImages}
                        openImageViewer={openImageViewer}
                    />
                    <EmotionsLineContainer
                        value={value}
                        id={id}
                    />
                </div>
                <BsThreeDots
                    onClick={(e) => {
                        handleClick(e)
                    }}
                    className={s.PostItemsActions}
                />

                <Box
                    style={{
                        display: `${!!anchorEl ? "display" : "none"}`
                    }}
                    key={anchorEl}
                    onClick={handleClose}
                    className={s.PostItemsActionsBox}
                    ref={wrapperRef}
                >
                    <Box
                        onClick={async () => {
                            const file = await createFile(imagesForPreview[0]);
                            console.log(file)
                            const content = await downloadZip([createFile(imagesForPreview[0])]).blob()
                            FileSaver.saveAs(content, "download.zip");
                            // for (let i = 0; i < imagesForPreview?.length; i++) {
                            //     console.log(downloadFile(imagesForPreview[i], `img${i}`))
                            // }
                        }}
                    >
                        <ListItemIcon>
                            <AiOutlineDownload/>
                        </ListItemIcon>
                        <Typography>Download attachments</Typography>
                    </Box>
                </Box>

                <span className={s.Time}>{DataHelper.fromNow(value.createdAt)}</span>
            </div>
        </>
    )
}

const MemoizedPostItem = React.memo(PostItem);

export default MemoizedPostItem;