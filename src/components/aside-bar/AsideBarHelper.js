import HttpHelper from "../../helpers/httpHelper"
import CommonHelper from "../../helpers/common"
function getPosts() {
    return HttpHelper.POSTS.getPosts(5)
}

function openFull(history, id) {
    CommonHelper.redirect(history, null, `/posts/${id}`)
}

const obj = { getPosts, openFull }

export default obj