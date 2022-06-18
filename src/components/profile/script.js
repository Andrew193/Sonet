import HttpHelper from "../../helpers/httpHelper";

function openModal(cl) {
    document.querySelector(`.${cl}`).classList.toggle("Open")
}

function confirmPerson(Class, phone, email) {
    openModal(Class);
    HttpHelper.confirm(phone, email)
}

function getPCount(id, set) {
    HttpHelper.getPCount(id, set)
}

function getMyFollowers(myId, history) {
    HttpHelper.followersArray((idArray, history) => HttpHelper.follow(idArray, history, "/Followers"), history, myId)
}

function getMyFollowings(myId, history) {
    HttpHelper.followingArray((idArray, history) => HttpHelper.follow(idArray, history, "/Followings"), history, myId)
}

function getUser(id) {
    return HttpHelper.getOneObj(id);
}

const obj = { openModal, getPCount, confirmPerson, getUser, getMyFollowings, getMyFollowers }

export default obj;