import {downloadFileVersion2, getElementsThemeConfig} from "../utils";
import s from "./posts.module.css";
import {Box, ListItemIcon, Typography} from "@mui/material";
import {AiOutlineDownload, AiOutlineHighlight} from "react-icons/ai";
import {deletePostById, refresh, updatePostById} from "./postsHelper";
import {AiOutlineDelete, BiShare} from "react-icons/all";
import {SharePost} from "../create-post/script";
import {notify} from "../App";
import {useEffect, useState} from "react";
import HttpHelper from "../helpers/httpHelper";
import {getItemFromLocalStorage} from "../localStorageService";

function PostItemActions(props) {
    const {
        anchorEl,
        settings,
        handleClose,
        wrapperRef,
        imagesForPreview,
        t,
        setPost,
        socket,
        setIsTextUpdate,
        setParentPosts,
        value,
        index
    } = props;

    const [isSharePossible, setIsSharePossible] = useState(false);
    const id = getItemFromLocalStorage("userInfo", "id");

    useEffect(() => {
        if (value.userId) {
            if (value.sharedInfo === "follow") {
                HttpHelper.FOLLOW.followerById(id, value.userId)
                    .then((response) => setIsSharePossible(() => +value?.userId !== id && !!response.length.length))
            } else if (value.sharedInfo === "mentions") {
                const mentions = JSON.parse(value.possibleMentions);
                for (let i = 0; i < mentions.length; i++) {
                    if(mentions[i].id === id) {
                        setIsSharePossible(true);
                        break;
                    }
                }
            } else if (value.sharedInfo === "all") {
                setIsSharePossible(() => +value?.userId !== id)
            }
        }
    }, [value.userId])

    return (
        <Box
            style={{
                display: `${!!anchorEl ? "display" : "none"}`,
                ...getElementsThemeConfig(settings)
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
                        setIsTextUpdate(() => ({
                            callback: (newPostText) => {
                                updatePostById(+value?.id, newPostText)
                                    .then(() => {
                                        setParentPosts((state) => {
                                            state.posts[index] = {...state.posts[index], text: newPostText}
                                            return JSON.parse(JSON.stringify(state));
                                        })
                                        notify(t("Updated"));
                                    })
                            },
                            label: "Type a new post text"
                        }));
                    }}
                >
                    <ListItemIcon>
                        <AiOutlineHighlight/>
                    </ListItemIcon>
                    <Typography>{t("Update")}</Typography>
                </Box>
            }
            {
                isSharePossible
                && <Box
                    onClick={() => {
                        if (value.sharedInfo === "all") {
                            setIsTextUpdate({
                                callback: (newPostText) => SharePost(newPostText, value),
                                label: "Shared post comment"
                            })
                        } else if (value.sharedInfo === "follow") {

                        }
                    }}
                >
                    <ListItemIcon>
                        <BiShare/>
                    </ListItemIcon>
                    <Typography>{t("Share")}</Typography>
                </Box>
            }
        </Box>
    )
}

export default PostItemActions;