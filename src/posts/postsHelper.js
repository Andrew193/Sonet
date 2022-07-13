import HTMLhelp from "../helpers/htmlHelper.js"
import HttpHelper from "../helpers/httpHelper"
import CommonHelper from "../helpers/common";

export function refresh(socket, userId) {
    socket.emit("postUpdate").emit("notMyPostUpdate", {userId}).emit("MyPostUpdate", {userId}).emit("postCreate")
}

export async function addPhotoToMyGallery(values, okCallback, errorCallback) {
    HttpHelper.addPhotoToMyGallery(values, okCallback, errorCallback);
}

export async function deletePostById(id) {
    HttpHelper.deletePostById(id, (r) => {
        console.log(r)
    })
}

function getMyPostWithEndpoint(id, set, endpoint) {
    HttpHelper.getPostWithType(id, set, endpoint)
}

function getPosts() {
    return HttpHelper.getPosts(null);
}

function afterEmotion(socket, userId, emtype, notify) {
    notify(HTMLhelp.createHTML({title: "Ok", message: `You ${emtype} it`}))
    refresh(socket, userId);
}

function getSelectedPost(id, notify) {
    return HttpHelper.getOnePost(id, notify)
        .then(response => response)
        .catch(error => error.response && console.error(error.response))
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
    HttpHelper.emotion(userId, value,
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
    deletePostById
}

export default obj;