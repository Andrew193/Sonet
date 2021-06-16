import axios from "axios";
import HTMLhelp from "../../helpers/htmlHelper.js"

function refresh(socket, userId) {
    socket.emit("postUpdate").emit("notMyPostUpdate", { userId }).emit("MyPostUpdate", { userId })
        .emit("postCreate")
}

function getPosts() {
    return axios.get("https://sonet34.herokuapp.com/api/post")
        .then((response) => response.data)
        .catch((error) => error)
}

function getSelectedPost(id) {
    return axios.get("https://sonet34.herokuapp.com/api/post/getOne", { params: { id } })
        .then((response) => response.data)
        .catch((error) => error)
}

function like(id, userId, likeCount, notify, dislikeCount, socket) {
    axios.put("https://sonet34.herokuapp.com/api/post/like", { userId, id, likeCount, dislikeCount })
        .then((response) => {
            notify(HTMLhelp.createHTML({ title: "Ok", message: "You like it" }))
            refresh(socket, userId);
        })
        .catch((error) => console.log(error))
}

function getComment(history,id) {
    history.push({
        pathname: "/comment",
        state: { id }
    })
}

function getNotMy(hist, id) {
    hist.push({
        pathname: "/post/notMy",
        state: { id }
    })
}

function getMy(hist,id) {
    hist.push({
        pathname: "/post/my",
        state: { id }
    })
}

function def(hist) {
    hist.push("/posts")
}

function dislike(id, userId, dislikeCount, notify, likeCount, socket) {
    axios.put("https://sonet34.herokuapp.com/api/post/dislike", { userId, id, dislikeCount, likeCount })
        .then((response) => {
            notify(HTMLhelp.createHTML({ title: "Ok", message: "You dislike it" }))
            refresh(socket, userId);
        })
        .catch((error) => console.log(error))
}

function openPost(e, history, inputId) {
    const id = e ? e.currentTarget.dataset.id : inputId
    history.push(`/posts/${id}`)
    window.location.reload();
}

const obj={ openPost, getSelectedPost, getPosts, like, dislike, getNotMy, getMy, def, getComment }

export default obj;