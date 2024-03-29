import s from "./posts.module.css";
import {alpha} from "@mui/material";
import {Link} from "react-router-dom";
import EmotionsLineContainer from "./EmotionsLineContainer";
import DataHelper from "../helpers/dateHelper";
import {useEffect, useState, useMemo, useCallback, useRef, useContext} from "react";
import ImageViewer from "react-simple-image-viewer";
import QuizBar from "./QuizBar";
import {BsThreeDots, RiShareForwardLine} from "react-icons/all";
import {getElementsThemeConfig, getPropertiesConfig} from "../utils";
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
import {AiOutlineClockCircle} from "react-icons/ai";
import PropTypes from "prop-types";
import LazyImage from "./LazyImage";

function PostItem(props) {
    const {
        bookmark,
        value,
        id,
        settings,
        customStyle,
        setPost = () => {
            //spare
        },
        index,
        setParentPosts = () => {
            //spare
        },
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

    useOutsideClick(wrapperRef, () => handleClose());

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
                <div className={s.PostItemBar}>
                    <LazyImage
                        imageSrc={userAvatar}
                        imgClass={s.PostAvatar}
                        wrapperStyle={{
                            ...getElementsThemeConfig(settings, getPropertiesConfig(true, null,
                                false, null, null, alpha("#b6c0f3", 0.3), false))
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
                    style={{flex: "10 0", padding: "10px"}}
                >
                    <h3>
                        <Link to={{pathname: `/users/${+value.userId}`}}
                              className={"authorName"}>{value.createdBy}</Link>
                    </h3>
                    <p className={s.PostTest}>{replaceTags(value.text, value.possibleMentions)}</p>
                    <QuizBar quiz={value.quiz} createdBy={value.createdBy} postId={value.id} id={id}
                             bookmark={bookmark}/>
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

                <span className={s.Time + " d-flex-c-c"}>
                    <AiOutlineClockCircle/>{DataHelper.fromNow(value.createdAt)}
                </span>
            </div>
        </>
    )
}

PostItem.propTypes = {
    bookmark: PropTypes.number,
    value: PropTypes.object,
    id: PropTypes.number,
    settings: PropTypes.object,
    customStyle: PropTypes.string,
    setPost: PropTypes.func,
    index: PropTypes.number,
    setParentPosts: PropTypes.func,
    ignoreAppOpen: PropTypes.bool
}

const MemoizedPostItem = React.memo(PostItem);

export default MemoizedPostItem;