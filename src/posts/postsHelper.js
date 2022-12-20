import HTMLhelp from "../helpers/htmlHelper.js"
import React from "react";
import HttpHelper from "../helpers/httpHelper"
import CommonHelper from "../helpers/common";
import textareaStyle from "../components/solid-textarea/solid-textarea.module.css";
import reactStringReplace from "react-string-replace";
import s from "./posts.module.css";
import profileHelper from "../components/profile/profileHelper";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {openUserProfile} from "../users/script";
import {detectHashtag, detectPerson, detectURL} from "../components/solid-textarea/utils/composeDecorators";
import PropTypes from "prop-types";

function MentionPerson(props) {
    const {
        mention
    } = props;

    const [avatar, setAvatar] = useState(null);
    const history = useHistory();
    getParsedUserAvatar(avatar, setAvatar, mention);

    return (
        <p
            className={s.MentionPerson}
            onClick={() => {
                openUserProfile(mention.id, history)
            }}
        >
            <span className={"SmallUserAvatar"}>
                <img src={avatar}/>
            </span>
            <span>{mention.userName}</span>
        </p>
    )
}

MentionPerson.propTypes = {
    mention: PropTypes.object
}

function ComponentToReplace(props) {
    const {
        link,
        match,
        className,
        i,
        mention
    } = props;

    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            {
                link
                    ? <a
                        href={match}
                        target="_blank" rel="noopener noreferrer"
                        key={i} className={textareaStyle.Editor__Highlight + " " + className}>{match}</a>
                    : <span key={i}
                            onMouseOver={() => setIsHovered(() => true)}
                            onMouseLeave={() => setIsHovered(() => false)}
                            className={textareaStyle.Editor__Highlight + " " + className}
                            style={{
                                display: "inline-block",
                                padding: "0px",
                                marginBottom: "3px",
                                position: "relative"
                            }}>
            {match}
                        <>
            {isHovered && mention && <MentionPerson mention={mention}/>}
            </>
        </span>
            }
        </>
    )
}

ComponentToReplace.propTypes = {
    link: PropTypes.string,
    match: PropTypes.string,
    className: PropTypes.string,
    i: PropTypes.number,
    mention: PropTypes.object
}

export function replaceTags(text, possibleMentions) {
    let possibleMentionsIndex = -1;
    const parsedPossibleMentions = JSON.parse(possibleMentions);

    return reactStringReplace(reactStringReplace(reactStringReplace(text, detectHashtag, (match, i) => (
        <ComponentToReplace i={i} className={textareaStyle.Editor_hashtag} match={match} key={i}/>
    )), detectPerson, (match, i) => {
        possibleMentionsIndex++;
        return <ComponentToReplace i={i} className={textareaStyle.Editor_mention} match={match}
                                   mention={parsedPossibleMentions[possibleMentionsIndex]} key={i}/>
    }), detectURL, (match, i) => (
        <ComponentToReplace i={i} className={textareaStyle.Editor_link} match={match} link key={i}/>
    ))
}

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

export async function getParsedUserAvatar(userAvatar, setUserAvatar, user) {
    if (!userAvatar) {
        try {
            setUserAvatar(JSON.parse(user?.avatar)?.webContentLink)
        } catch (error) {
            setUserAvatar(user?.avatar)
        }
    }
}

export function refresh(socket, userId) {
    socket.emit("postUpdate").emit("notMyPostUpdate", {userId}).emit("MyPostUpdate", {userId}).emit("postCreate")
}

export async function addPhotoToMyGallery(values, okCallback, errorCallback) {
    HttpHelper.GALLERY.addPhotoToMyGallery(values, okCallback, errorCallback);
}

export function getHashtags(text) {
    return text.replace(/[\.,:;-]/g, '').split(' ').filter(e => e.toLowerCase()[0] === '#')
}

export function getFilteredPostsByTags(posts, history) {
    return {
        posts: posts?.posts?.map((post) => {
            const currentHashtags = history?.location?.hash?.split("#")?.map((e) => "#" + e);
            const postHashtags = JSON.parse(post?.tags);
            let shouldShow = false;
            for (let i = 0; i < currentHashtags?.length; i++) {
                if (postHashtags?.includes(currentHashtags[i])) {
                    shouldShow = true;
                    break;
                }
            }
            return {...post, show: shouldShow};
        })
    }
}

export async function deletePostById(id, savedImages) {
    HttpHelper.POSTS.deletePostById(id, () => {
        //spare
    }, savedImages)
}

export async function updatePostById(id, text) {
    HttpHelper.POSTS.updatePostById({id, newText: text}, () => {
        //spare
    })
}

function getMyPostWithEndpoint(id, set, endpoint) {
    HttpHelper.POSTS.getPostWithType(id, set, endpoint)
}

function getPosts() {
    return HttpHelper.POSTS.getPosts(null);
}

function afterEmotion(socket, userId, emtype, notify) {
    refreshWithUpdate(`You ${emtype} it`, socket, userId, notify)
}

export function refreshWithUpdate(message, socket, userId, notify) {
    notify(HTMLhelp.createHTML({title: "Ok", message: message}))
    refresh(socket, userId);
}

function getSelectedPost(id, notify) {
    return HttpHelper.POSTS.getOnePost(id, notify)
        .then(response => response)
        .catch(error => error.response && console.error(error.response))
}

export function setEmotion(userId, value, emotionType, emotionCount, socket) {
    return HttpHelper.POSTS.complexEmotions({userId, value, emotionType, emotionCount}, () => {
        refresh(socket, userId)
    }, () => {
        //spare
    })
}

function getComment(history, postId, commentId) {
    CommonHelper.redirect(history, {id: postId, commentId}, "/comment")
}

function getNotMy(history, id) {
    CommonHelper.redirect(history, {id}, "/post/notMy")
}

function getMy(history, id) {
    CommonHelper.redirect(history, {id}, "/post/my")
}

function def(hist) {
    CommonHelper.redirect(hist, null, "/posts")
}

function dislike(value, userId, notify, socket) {
    executeEmotion(userId, value, socket, notify, "dislike")
}

function executeEmotion(userId, value, socket, notify, type) {
    HttpHelper.POSTS.emotion(userId, value,
        () => {
            afterEmotion(socket, userId, type, notify)
        },
        (error) => {
            notify(HTMLhelp.createHTML({title: "Sorry", message: error?.response?.data?.error}))
        }, type)
}


function like(value, userId, notify, socket) {
    executeEmotion(userId, value, socket, notify, "like")
}

function openPost(e, history, inputId) {
    const id = e ? e?.currentTarget?.dataset?.id : inputId
    CommonHelper.redirect(history, null, `/posts/${id}`)
    window.location.reload();
}

const obj = {
    openPost,
    getSelectedPost,
    getPosts,
    like,
    dislike,
    getNotMy,
    getMy,
    def,
    getComment,
    getMyPostWithEndpoint,
    deletePostById,
    updatePostById
}

export default obj;