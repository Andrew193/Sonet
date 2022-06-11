import HttpHelper from "../helpers/httpHelper"
import CommonHelper from "../helpers/common"
function getUsers() {
    return HttpHelper.getAllUsers();
}

function getSelectedUser(id) {
    return HttpHelper.getOneUser(id)
}

function openUser(e, history, inputId) {
    const id = e ? e.currentTarget.dataset.id : inputId
    CommonHelper.redirect(history, null, `/users/${id}`)
    window.location.reload()
}
function openUserPofile(id, hist) {
    CommonHelper.redirect(hist, null, `/profile/${id}`)
}
function input(value) {
    const valueReal = parseInt(value)
    return !Number.isNaN(valueReal) ? valueReal : 0
}
function HidePanel(e, s) {
    const parrent = e.target.parentElement;
    parrent.classList.toggle(s.Hide)
    parrent.previousElementSibling.classList.toggle(s.FullHeight)
    parrent.previousElementSibling.children[0].scrollIntoView()
}
function Subscribe(id, toast, otherUserFolCount) {
    HttpHelper.subscribe(id, otherUserFolCount, toast)
}

const obj = { getUsers, openUser, getSelectedUser, HidePanel, input, openUserPofile, Subscribe }

export default obj;