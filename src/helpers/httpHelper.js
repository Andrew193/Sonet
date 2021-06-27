import cookieHelper from "./cookieHelper"
import CommonHelper from "./common"
const axios = require('axios').default;
class Http {
    constructor() { }
    uploadImg(endpoint, data) {
        fetch("https://sonet34.herokuapp.com/api/img/" + endpoint, {
            method: "POST",
            body: data
        }
        )
    }
    configToken(token, history) {
        axios.get("https://sonet34.herokuapp.com/api/token/configToken", { params: { token } })
            .then((response) => console.log(response)).catch((error) => {
                if (error) {
                    cookieHelper.removeCookie("token")
                    CommonHelper.redirect(history, null, "/auth")
                }
            })
    }
    subscribe(id, otherUserFolCount, toast) {
        axios.post("https://sonet34.herokuapp.com/api/subscribe", { userId: id, otherUserFolCount })
            .then((response) => toast(response.data.message))
            .catch((error) => error.response && console.error(error.response))
    }
    getOneUser(id) {
        return axios.get("https://sonet34.herokuapp.com/api/users/getOne", { params: { id } })
            .then((response) => response.data)
            .catch((error) => error.response && console.error(error.response))
    }
    getAllUsers() {
        return axios.get("https://sonet34.herokuapp.com/api/users")
            .then((response) => response.data)
            .catch((error) => error.response && console.error(error.response))
    }
    getPosts(count) {
        return axios.get("https://sonet34.herokuapp.com/api/post", { params: { howMany: count } })
            .then((response) => response.data)
            .catch((error) => error.response && console.error(error.response))
    }
    confirm(phone, email) {
        axios.post("https://sonet34.herokuapp.com/api/users/confirm", { phone, email })
    }
    getPCount(id, set) {
        axios.get("https://sonet34.herokuapp.com/api/post/count", { params: { id } })
            .then((response) => set(response.data.count))
            .catch((error) => error.response && console.error(error.response))
    }
    getOneObj(id) {
        return axios.get("https://sonet34.herokuapp.com/api/users/getOneObj", { params: { id } })
            .then((response) => response)
            .catch((error) => error)
    }
    follow(idArray, history) {
        axios.get("https://sonet34.herokuapp.com/api/follow", { params: { idArray: JSON.stringify(idArray) } })
            .then((response) => CommonHelper.redirect(history, response.data, "/followers"))
            .catch((error) => error.response && console.error(error.response.data.error))
    }
    followingArray(callback, history, myId) {
        axios.get("https://sonet34.herokuapp.com/api/follow/followingsArray", { params: { myId } })
            .then((response) => {
                const idArray = response.data.length.reduce((prev, curr) => [...prev, +curr.userId], [])
                callback(idArray, history)
            })
            .catch((error) => error.response && console.error(error.response.data.error))
    }
    followersArray(callback, history, myId) {
        axios.get("https://sonet34.herokuapp.com/api/follow/followersArray", { params: { myId } })
            .then((response) => {
                const idArray = response.data.length.reduce((prev, curr) => [...prev, +curr.userId], [])
                callback(idArray, history)
            })
            .catch((error) => error.response && console.error(error.response.data.error))
    }
    getOnePost(id, notify) {
        return axios.get("https://sonet34.herokuapp.com/api/post/getOne", { params: { id } })
            .then((response) => response.data)
            .catch((error) => error.response && notify(error.response.data.posts))
    }
    emotion(userId, id, likeCount, dislikeCount, callback, callback1, emType) {
        axios.put("https://sonet34.herokuapp.com/api/post/" + emType, { userId, id, likeCount, dislikeCount })
            .then((response) => callback())
            .catch((error) => error.response && callback1(error))
    }
    getPostWithType(id, setPosts, endpoint) {
        axios.get("https://sonet34.herokuapp.com/api/post/" + endpoint, { params: { userId: id } })
            .then((response) => setPosts({ posts: response.data.posts }))
            .catch((error) => console.log(error))
    }
    userUpdate(values) {
        axios.put("https://sonet34.herokuapp.com/api/users/update", values)
    }
    getMe(callback) {
        return axios.get("https://sonet34.herokuapp.com/api/users/me")
            .then((response) => response)
            .catch((error) => error.response && callback(error.response))
    }
    createPost(text, callback, callback1) {
        axios.post("https://sonet34.herokuapp.com/api/post", { text })
            .then((response) => callback(response))
            .catch((error) => error && callback1(error))
    }
    getAllComments(id, callback) {
        return axios.get("https://sonet34.herokuapp.com/api/post/comment", { params: { id } })
            .then((response) => response)
            .catch((error) => error.response && callback())
    }
    createComment(value, postId, id, userName, comCount, callback, callback1) {
        axios.post("https://sonet34.herokuapp.com/api/post/comment", {
            text: value, postId, userId: id, createdBy: userName, comCount
        })
            .then((response) => callback(response))
            .catch((error) => error.response && callback1())
    }
    createUser(values, callback, callback1) {
        axios.post("https://sonet34.herokuapp.com/api/users", values)
            .then((response) => callback(response.data.token))
            .catch((error) => error && callback1())
    }
    authUser(values, callback, callback1) {
        axios.get("https://sonet34.herokuapp.com/api/users/auth", { params: values })
            .then((response) => callback(response.data.token))
            .then((error) => error.response && callback1(error.response.data.error))
    }
}

const Item = new Http();

export default Item;