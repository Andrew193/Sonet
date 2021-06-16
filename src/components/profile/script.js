const { default: axios } = require("axios")



function openModal(cl) {
    document.querySelector(`.${cl}`).classList.toggle("Open")
}

function confirmPerson(Class, phone, email) {
    openModal(Class);
    axios.post("https://sonet34.herokuapp.com/api/users/confirm", { phone, email })
}

function getPCount(id, set) {
    axios.get("https://sonet34.herokuapp.com/api/post/count", { params: { id } })
        .then((response) => {
            set(response.data.count)
        })
        .catch((error) => {
            console.log(error);
        })
}
function getUser(id) {
    return axios.get("https://sonet34.herokuapp.com/api/users/getOneObj", { params: { id } })
        .then((response) => response)
        .catch((error) => error)
}
module.exports = { openModal, getPCount, confirmPerson, getUser }