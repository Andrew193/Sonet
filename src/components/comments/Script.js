import axios from "axios";
import HTMLhelp from "../../helpers/htmlHelper"

function createComment(value, userInfo, postId, comCount, notify, socket) {
    axios.post("https://sonet34.herokuapp.com/api/post/comment", {
        text: value, postId, userId: userInfo.id, createdBy: userInfo.userName, comCount
    })
        .then((response) => {
            socket.emit("CommentAdd", { id: postId }).emit("refreshPost", { id: postId })
            notify(HTMLhelp.createHTML({ title: "Ok", message: response.data.message }))
        })
        .catch((error) => error.response && notify(HTMLhelp.createHTML({ title: "Sorry", message: "Could not add comment" })))
}

function getAllComments(id,notify) {
    return axios.get("https://sonet34.herokuapp.com/api/post/comment", { params: { id } })
        .then((response) => response)
        .catch((error) => error.response && notify(HTMLhelp.createHTML({ title: "Sorry", message: "Could not get comment" })))
}

const obj = { createComment, getAllComments }

export default obj;