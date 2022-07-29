import s from "./posts.module.css";
import {alpha, Avatar, Box, hexToRgb, ListItemIcon, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import EmotionsLineContainer from "./EmotionsLineContainer";
import DataHelper from "../helpers/dateHelper";
import {useEffect, useState, useMemo, useCallback, useRef, useContext} from "react";
import ImageViewer from "react-simple-image-viewer";
import {AiOutlineDelete, BsThreeDots} from "react-icons/all";
import {AiOutlineDownload, AiOutlineHighlight} from "react-icons/ai";
import {downloadFileVersion2} from "../utils";
import {useOutsideClick} from "../hooks";
import PostItemsImages from "./PostItemsImages";
import React from "react";
import {useTranslation} from "react-i18next";
import {deletePostById, refresh, updatePostById} from "./postsHelper";
import InputEmoji from 'react-input-emoji';
import Context from "../helpers/contextHelper";
import profileHelper from "../components/profile/profileHelper";

export async function getUserAvatar(userAvatar, setUserAvatar, userId) {
    if (userId && !userAvatar) {
        const response = await profileHelper.getUser(userId);

        try {
            setUserAvatar(JSON.parse(response?.data?.user?.avatar)?.webContentLink)
        } catch (error) {
            setUserAvatar(response?.data?.user?.avatar)
        }
    }
}

function PostItem(props) {
    const {
        value,
        id,
        settings,
        customStyle,
        setPost,
        index,
        setParentPosts
    } = props;

    const [userAvatar, setUserAvatar] = useState();
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const {socket, notify} = useContext(Context)

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    useEffect(() => {
        getUserAvatar(userAvatar, setUserAvatar, value?.userId)
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

    const {t} = useTranslation();
    const [newPostText, setNewPostText] = useState("");
    const [isTextUpdate, setIsTextUpdate] = useState(false);

    return (
        <>
            {isTextUpdate && <div
                className={"inputCover"}
            >
                <InputEmoji
                    value={newPostText}
                    onChange={setNewPostText}
                    cleanOnEnter
                    placeholder={t("Type a new post text")}
                />
                <span
                    id={"mainPostBtn"}
                    onClick={() => {
                        setIsTextUpdate(false);
                        updatePostById(+value?.id, newPostText)
                            .then(() => {
                                setParentPosts((state) => {
                                    state.posts[index] = {...state.posts[index], text: newPostText}
                                    return JSON.parse(JSON.stringify(state));
                                })
                                notify(t("Updated"));
                            })
                    }
                    }
                >Submit</span>
            </div>
            }
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
                className={s.Item + " itemsPostsPage " + customStyle}
                data-id={value.id}
                style={settings?.list?.listItemStyles}
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
                        valueUserId={+value.userId}
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
                        display: `${!!anchorEl ? "display" : "none"}`,
                        boxShadow: `0px 0px 8px 0px ${alpha(settings?.configs?.color[settings?.color] || "#b6c0f3", 0.8)}`
                    }}
                    key={anchorEl}
                    onClick={handleClose}
                    className={s.PostItemsActionsBox}
                    ref={wrapperRef}
                >
                    {
                        imagesForPreview?.length > 0
                            ? <Box
                                onClick={async () => {
                                    let i = 0;
                                    const interval = setInterval(function () {
                                        downloadFileVersion2(imagesForPreview[i])
                                        i++;
                                        if (i === imagesForPreview?.length) {
                                            clearInterval(interval)
                                        }
                                    }, 1000);
                                }}
                            >
                                <ListItemIcon>
                                    <AiOutlineDownload/>
                                </ListItemIcon>
                                <Typography>{t("Download attachments ( Unsafe )")}</Typography>
                            </Box>
                            : null
                    }
                    {
                        +value?.userId === id
                        && <Box
                            onClick={() => {
                                deletePostById(+value?.id)
                                    .then(() => {
                                        setPost((state) => {
                                            state.splice(index, 1);
                                            return state;
                                        })
                                        notify(t("Deleted"));
                                        refresh(socket, id)
                                    })
                            }}
                        >
                            <ListItemIcon>
                                <AiOutlineDelete/>
                            </ListItemIcon>
                            <Typography>{t("Delete")}</Typography>
                        </Box>
                    }
                    {
                        +value?.userId === id
                        && <Box
                            onClick={() => {
                                setIsTextUpdate(true);
                            }}
                        >
                            <ListItemIcon>
                                <AiOutlineHighlight/>
                            </ListItemIcon>
                            <Typography>{t("Update")}</Typography>
                        </Box>
                    }
                </Box>

                <span className={s.Time + " fromNow"}>{DataHelper.fromNow(value.createdAt)}</span>
            </div>
        </>
    )
}

const MemoizedPostItem = React.memo(PostItem);

export default MemoizedPostItem;