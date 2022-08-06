import HTMLhelp from "../helpers/htmlHelper.js"
import HttpHelper from "../helpers/httpHelper"
import CommonHelper from "../helpers/common";

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

export async function deletePostById(id) {
    HttpHelper.POSTS.deletePostById(id, () => {
    })
}

export async function updatePostById(id, text) {
    HttpHelper.POSTS.updatePostById({id, newText: text}, () => {
    })
}

function getMyPostWithEndpoint(id, set, endpoint) {
    HttpHelper.POSTS.getPostWithType(id, set, endpoint)
}

function getPosts() {
    return HttpHelper.POSTS.getPosts(null);
}

function afterEmotion(socket, userId, emtype, notify) {
    notify(HTMLhelp.createHTML({title: "Ok", message: `You ${emtype} it`}))
    refresh(socket, userId);
}

function getSelectedPost(id, notify) {
    return HttpHelper.POSTS.getOnePost(id, notify)
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