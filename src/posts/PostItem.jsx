import s from "./posts.module.css";
import {alpha, Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import EmotionsLineContainer from "./EmotionsLineContainer";
import DataHelper from "../helpers/dateHelper";
import {useEffect, useState, useMemo, useCallback, useRef, useContext} from "react";
import ImageViewer from "react-simple-image-viewer";
import QuizBar from "./QuizBar";
import {BsThreeDots, RiShareForwardLine} from "react-icons/all";
import {getElementsThemeConfig} from "../utils";
import {useOutsideClick} from "../hooks";
import PostItemsImages from "./PostItemsImages";
import React from "react";
import {useTranslation} from "react-i18next";
import {getUserAvatar, replaceTags} from "./postsHelper";
import InputEmoji from 'react-input-emoji';
import HashtagsLine from "./HashtagsLine";
import {Context} from "../App";
import PostItemActions from "./PostItemActions";
import SharedPost from "./SharedPost";

function PostItem(props) {
    const {
        bookmark,
        value,
        id,
        settings,
        customStyle,
        setPost,
        index,
        setParentPosts,
        ignoreAppOpen
    } = props;

    const [userAvatar, setUserAvatar] = useState();
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const {socket} = useContext(Context)

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    useEffect(() => {
        getUserAvatar(userAvatar, setUserAvatar, value?.userId);
    }, [])

    const imagesForPreview = useMemo(() => JSON.parse(value?.savedImages)?.map((image) => JSON.parse(image)?.webContentLink)
        , [])

    const [anchorEl, setAnchorEl] = useState(null);
    const wrapperRef = useRef(null);

    useOutsideClick(wrapperRef, () => handleClose())

    const handleClick = (event, ignoreAppOpenCallback) => {
        if (!ignoreAppOpen && !ignoreAppOpenCallback) {
            window?.document?.body?.querySelector(".App")?.classList?.add("Open");
        }
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null)

    const {t} = useTranslation();
    const [newPostText, setNewPostText] = useState("");
    const [isTextUpdate, setIsTextUpdate] = useState(false);

    return (
        <>
            {isTextUpdate && <div className={"inputCover"}>
                <InputEmoji
                    value={newPostText}
                    onChange={setNewPostText}
                    cleanOnEnter
                    placeholder={t(isTextUpdate.label)}
                />
                <span
                    id={"mainPostBtn"}
                    onClick={() => {
                        isTextUpdate.callback(newPostText);
                        setIsTextUpdate(false);
                    }}
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
                <div style={{position: "relative"}}>
                    <Avatar
                        src={userAvatar}
                        style={{
                            height: '75px',
                            width: '75px',
                            marginRight: '15px',
                            borderRadius: '5px',
                            ...getElementsThemeConfig(settings)
                        }}
                    />
                    {value?.shared === "{}" ? null : <RiShareForwardLine style={{
                        color: "red",
                        height: "30px",
                        width: "30px",
                        position: "absolute",
                        left: "50%",
                        bottom: "50%"
                    }}
                    />}
                </div>
                <div
                    style={{flex: '10 0'}}
                >
                    <h3>
                        <Link to={{pathname: `/users/${+value.userId}`}}
                              className={"authorName"}>{value.createdBy}</Link>
                    </h3>
                    <p>{replaceTags(value.text, value.possibleMentions)}</p>
                    <QuizBar quiz={value.quiz} createdBy={value.createdBy} postId={value.id} id={id}/>
                    <HashtagsLine text={value.text}/>
                    <PostItemsImages
                        valueUserId={+value.userId}
                        valueSavedImages={value?.savedImages}
                        openImageViewer={openImageViewer}
                    />
                    <SharedPost shared={value.shared}/>
                    <EmotionsLineContainer
                        containerClass={s.EmotionContainer}
                        value={value}
                        id={id}
                    />
                </div>
                <BsThreeDots
                    onClick={(e) => handleClick(e, true)}
                    className={s.PostItemsActions}
                />

                <PostItemActions
                    bookmark={bookmark}
                    anchorEl={anchorEl}
                    settings={settings}
                    handleClose={handleClose}
                    wrapperRef={wrapperRef}
                    imagesForPreview={imagesForPreview}
                    t={t}
                    setPost={setPost}
                    socket={socket}
                    setIsTextUpdate={setIsTextUpdate}
                    setParentPosts={setParentPosts}
                    value={value}
                    id={id}
                    index={index}
                />

                <span className={s.Time + " fromNow"}>{DataHelper.fromNow(value.createdAt)}</span>
            </div>
        </>
    )
}

const MemoizedPostItem = React.memo(PostItem);

export default MemoizedPostItem;