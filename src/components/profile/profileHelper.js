import HttpHelper from "../../helpers/httpHelper";
import {notify} from "../../App";

function openModal(cl) {
    document.querySelector(`.${cl}`).classList.toggle("Open")
}

function getLikes(userId, setLikes) {
    HttpHelper.getAllLikesByUserId(userId, () => {
        notify("Something went wrong with your likes")
    }).then(response => {
        setLikes(response?.data?.posts)
    })
}

function getDislikes(userId, setDislikes) {
    HttpHelper.getAllDislikesByUserId(userId, () => {
        notify("Something went wrong with your dislikes")
    }).then(response => {
        setDislikes(response?.data?.posts)
    })
}

function getMyComments(userId, setComments) {
    HttpHelper.getAllCommentsByUserId(userId, () => {
        notify("Something went wrong with your comments")
    }).then(data => setComments(data?.data?.posts))
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

const obj = {openModal, getPCount, confirmPerson, getUser, getMyFollowings, getMyFollowers, getMyComments, getLikes, getDislikes}

export default obj;