import axios from "axios";

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

function getMyFollowers(myId, history) {

}

function getMyFollowings(myId, history) {
    axios.get("https://sonet34.herokuapp.com/api/follow/followingsArray", { params: { myId } })
        .then((response) => {
            const idArray = response.data.length.reduce((prev, curr) => [...prev, +curr.userId], [])
            axios.get("https://sonet34.herokuapp.com/api/follow", { params: { idArray: JSON.stringify(idArray) } })
                .then((response) => {
                    console.log(response.data);
                    history.push({
                        pathname: "/followers",
                        state: response.data
                    })
                }).catch((error) => error.response && console.error(error.response.data.error))
        })
        .catch((error) => error.response && console.error(error.response.data.error))
}

function getUser(id) {
    return axios.get("https://sonet34.herokuapp.com/api/users/getOneObj", { params: { id } })
        .then((response) => response)
        .catch((error) => error)
}

const obj = { openModal, getPCount, confirmPerson, getUser, getMyFollowings }

export default obj;