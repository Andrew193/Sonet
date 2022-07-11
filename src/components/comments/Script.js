import HTMLhelp from "../../helpers/htmlHelper"
import HttpHelper from "../../helpers/httpHelper"

function createComment(value, userInfo, postId, comCount, notify, socket) {
    return HttpHelper.createComment(value, postId, userInfo.id, userInfo.userName, comCount, (response) => {
        socket.emit("CommentAdd", { id: postId }).emit("refreshPost", { id: postId })
        notify(HTMLhelp.createHTML({ title: "Ok", message: response?.data?.message }))
    },
        () => notify(HTMLhelp.createHTML({ title: "Sorry", message: "Could not add comment" })))
}

function getAllComments(id, notify) {
    return HttpHelper.getAllComments(id, () => notify(HTMLhelp.createHTML({ title: "Sorry", message: "Could not get comment" })))
}

const obj = { createComment, getAllComments }

export default obj;