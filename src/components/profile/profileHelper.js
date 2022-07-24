import HttpHelper from "../../helpers/httpHelper";
import {notify} from "../../App";

function openModal(cl) {
    document.querySelector(`.${cl}`).classList.toggle("Open")
}

function getLikes(userId, setLikes) {
    HttpHelper.POSTS.getAllLikesByUserId(userId, () => {
        notify("Something went wrong with your likes")
    }).then(response => {
        setLikes(response?.data?.posts)
    })
}

function getDislikes(userId, setDislikes) {
    HttpHelper.POSTS.getAllDislikesByUserId(userId, () => {
        notify("Something went wrong with your dislikes")
    }).then(response => {
        setDislikes(response?.data?.posts)
    })
}

function getMyComments(userId, setComments) {
    HttpHelper.POSTS.getAllCommentsByUserId(userId, () => {
        notify("Something went wrong with your comments")
    }).then(data => setComments(data?.data?.posts))
}

function confirmPerson(Class, phone, email) {
    openModal(Class);
    HttpHelper.USERS.confirm(phone, email)
}

function getPCount(id, set) {
    HttpHelper.POSTS.getPCount(id, set)
}

function getMyFollowers(myId, history) {
    HttpHelper.FOLLOW.followersArray((idArray, history) => HttpHelper.FOLLOW.follow(idArray, history, "/Followers"), history, myId)
}

function getMyFollowings(myId, history) {
    HttpHelper.FOLLOW.followingArray((idArray, history) => HttpHelper.FOLLOW.follow(idArray, history, "/Followings"), history, myId)
}

function getUser(id) {
    return HttpHelper.USERS.getOneObj(id);
}

const obj = {openModal, getPCount, confirmPerson, getUser, getMyFollowings, getMyFollowers, getMyComments, getLikes, getDislikes}

export default obj;