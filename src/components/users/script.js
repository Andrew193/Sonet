import axios from "axios";


function getUsers() {
    return axios.get("https://sonet34.herokuapp.com/api/users")
        .then((response) => response.data)
        .catch((error) => error)
}

function getSelectedUser(id) {
    return axios.get("https://sonet34.herokuapp.com/api/users/getOne", { params: { id } })
        .then((response) => response.data)
        .catch((error) => error)
}

function openUser(e, history, inputId) {
    const id = e ? e.currentTarget.dataset.id : inputId
    history.push(`/users/${id}`)
    window.location.reload()
}
function openUserPofile(id,hist) {
    hist.push(`/profile/${id}`)
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

const obj={ getUsers, openUser, getSelectedUser, HidePanel, input, openUserPofile}

export default obj;