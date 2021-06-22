import HTMLhelp from "../../helpers/htmlHelper.js"
import HttpHelper from "../../helpers/httpHelper"
import CommonHelper from "../../helpers/common"
function refresh(socket, userId) {
    socket.emit("postUpdate").emit("notMyPostUpdate", { userId }).emit("MyPostUpdate", { userId }).emit("postCreate")
}

function getMyPostWithEndpoint(id,set,endpoint) {
    HttpHelper.getPostWithType(id,set,endpoint)
}

function getPosts() {
    return HttpHelper.getPosts(null);
}

function afterEmotion(socket, userId, emtype, notify) {
    notify(HTMLhelp.createHTML({ title: "Ok", message: `You ${emtype} it` }))
    refresh(socket, userId);
}

function getSelectedPost(id, notify) {
    return HttpHelper.getOnePost(id, notify);
}

function like(id, userId, likeCount, notify, dislikeCount, socket) {
    HttpHelper.emotion(userId, id, likeCount, dislikeCount, () => afterEmotion(socket, userId, "dislike", notify),
        (error) => notify(HTMLhelp.createHTML({ title: "Sorry", message: error.response.data.error })), "like")
}

function getComment(history, id) {
    CommonHelper.redirect(history, { id }, "/comment")
}

function getNotMy(history, id) {
    CommonHelper.redirect(history, { id }, "/post/notMy")
    window.location.reload();
}

function getMy(history, id) {
    CommonHelper.redirect(history, { id }, "/post/my")
    window.location.reload();
}

function def(hist) {
    CommonHelper.redirect(hist, null, "/posts")
}

function dislike(id, userId, dislikeCount, notify, likeCount, socket) {
    HttpHelper.emotion(userId, id, likeCount, dislikeCount, () => afterEmotion(socket, userId, "dislike", notify),
        (error) => notify(HTMLhelp.createHTML({ title: "Sorry", message: error.response.data.error })), "dislike")
}

function openPost(e, history, inputId) {
    const id = e ? e.currentTarget.dataset.id : inputId
    CommonHelper.redirect(history, null, `/posts/${id}`)
    window.location.reload();
}

const obj = { openPost, getSelectedPost, getPosts, like, dislike, getNotMy, getMy, def, getComment,
    getMyPostWithEndpoint }

export default obj;