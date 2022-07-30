import cookieHelper from "./cookieHelper"
import CommonHelper from "./common"
import Script from "./cookieHelper";
import {createErrorsForApiCall} from "../utils";
import {notify} from "../App";
import {API, img_api} from "../vars";

const axios = require('axios').default;

const Http = {
    uploadImg: (endpoint, data) => {
        return fetch(img_api + endpoint + "?token=" + Script.getCookie("token"), {
                method: "POST",
                body: data
            }
        )
    },
    configToken: (token, history) => {
        axios.get(API + "token/configToken", {params: {token}})
            .then(_ => {
            }).catch((error) => {
            if (error) {
                cookieHelper.removeCookie("token")
                CommonHelper.redirect(history, null, "/auth")
            }
        })
    },
    subscribe: (id, otherUserFolCount, toast) => {
        axios.post(API + "subscribe?token=" + Script.getCookie("token"), {
            userId: id,
            otherUserFolCount
        })
            .then((response) => toast(response?.data?.message))
            .catch((error) => error.response && console.error(error.response))
    },
    USERS: {
        getAllUsers: () => {
            return axios.get(API + "users")
                .then((response) => response?.data)
                .catch((error) => error.response && console.error(error.response))
        },
        confirm: (phone, email) => {
            axios.post(API + "users/confirm?token=" + Script.getCookie("token"), {phone, email})
        },
        getOneObj: (id) => {
            return axios.get(API + "users/getOneObj?token=" + Script.getCookie("token"), {params: {id}})
                .then((response) => response)
                .catch((error) => error)
        },
        getOneUser: (id) => {
            return axios.get(API + "users/getOne", {params: {id}})
                .then((response) => response?.data)
                .catch((error) => error.response && console.error(error.response))
        },
        resetPassword: (email) => {
            return axios.get(API + "users/newPassword", {params: {email}})
                .then((response) => response)
                .catch((error) => error)
        },
        userUpdate: (values) => {
            axios.put(API + "users/update", values)
                .then(() => {
                    notify("Updated successfully")
                })
                .catch((error) => {
                    const message = createErrorsForApiCall(error?.response?.data, error?.response?.data)
                    const Msg = ({closeToast, toastProps}) => (
                        <div>{message}</div>
                    )
                    notify(<Msg/>);
                })
        },
        getMe: (callback) => {
            return axios.get(API + "users/me?token=" + Script.getCookie("token"))
                .then((response) => response)
                .catch((error) => error.response && callback(error.response))
        },
        createUser: (values, okCallback, errorCallback) => {
            axios.post(API + "users", values)
                .then((response) => {
                    okCallback(response?.data?.token);
                })
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        authUser: (values, callback, callback1) => {
            axios.get(API + "users/auth", {params: values})
                .then((response) => callback(response?.data?.token))
                .catch((error) => error?.response && callback1(error?.response?.data?.error))
        },
    },
    FOLLOW: {
        follow: (idArray, history, type) => {
            axios.get(API + "follow?token=" + Script.getCookie("token"), {params: {idArray: JSON.stringify(idArray)}})
                .then((response) => CommonHelper.redirect(history, response?.data, "/followers" + type))
                .catch((error) => error.response && console.error(error?.response?.data?.error))
        },
        followingArray: (callback, history, myId) => {
            axios.get(API + "follow/followingsArray?token=" + Script.getCookie("token"), {params: {myId}})
                .then((response) => {
                    const idArray = response?.data?.length?.reduce((prev, curr) => [...prev, +curr.userId], [])
                    callback(idArray, history)
                })
                .catch((error) => error.response && console.error(error?.response?.data?.error))
        },
        followersArray: (callback, history, myId) => {
            axios.get(API + "follow/followersArray?token=" + Script.getCookie("token"), {params: {myId}})
                .then((response) => {
                    const idArray = response?.data?.length?.reduce((prev, curr) => [...prev, +curr.userId], [])
                    callback(idArray, history)
                })
                .catch((error) => error?.response && console.error(error?.response?.data?.error))
        },
    },
    POSTS: {
        getPosts: (count, prefix, search = "") => {
            return axios.get(API + `post${prefix ? `/${prefix}` : ""}?token=` + Script.getCookie("token") + search, {params: {howMany: count}})
                .then((response) => response?.data)
                .catch((error) => error.response && console.error(error.response))
        },
        getPCount: (id, set) => {
            axios.get(API + "post/count?token=" + Script.getCookie("token"), {params: {id}})
                .then((response) => set(response?.data?.count))
                .catch((error) => error.response && console.error(error.response))
        },
        getOnePost: (id, notify) => {
            return axios.get(API + "post/getOne?token=" + Script.getCookie("token"), {params: {id}})
                .then((response) => response?.data)
                .catch((error) => error?.response && notify(error?.response?.data?.posts))
        },
        emotion: (userId, value, callback, callback1, emType) => {
            axios.put(API + "post/" + emType, {
                userId,
                ...value,
                postText: JSON.stringify(value)
            })
                .then((response) => callback())
                .catch((error) => error.response && callback1(error))
        },
        getPostWithType: (id, setPosts, endpoint) => {
            axios.get(API + "post/" + endpoint + "?token=" + Script.getCookie("token"), {params: {userId: id}})
                .then((response) => setPosts({posts: response?.data?.posts}))
                .catch((error) => console.log(error))
        },
        deletePostById: (id, setPosts) => {
            axios.delete(API + "post/" + "?token=" + Script.getCookie("token"), {params: {postId: id}})
                .then((response) => setPosts({posts: response?.data?.posts}))
                .catch((error) => console.log(error))
        },
        updatePostById: ({id, newText}, setPosts) => {
            axios.put(API + "post/" + "?token=" + Script.getCookie("token"), {
                params: {
                    postId: id,
                    newText
                }
            })
                .then((response) => setPosts({posts: response?.data?.posts}))
                .catch((error) => console.log(error))
        },
        createPost: (text, callback, callback1, savedImages) => {
            axios.post(API + "post?token=" + Script.getCookie("token"), {
                text,
                savedImages: JSON.stringify(savedImages || [])
            })
                .then((response) => callback(response))
                .catch((error) => error && callback1(error))
        },
        getAllComments: (id, callback) => {
            return axios.get(API + "post/comment?token=" + Script.getCookie("token"), {params: {id}})
                .then((response) => response)
                .catch((error) => error.response && callback())
        },
        getAllCommentsByUserId: (userId, callback) => {
            return axios.get(API + "post/comment/id?token=" + Script.getCookie("token"), {params: {id: userId}})
                .then((response) => response)
                .catch((error) => error.response && callback())
        },
        getAllLikesByUserId: (userId, callback) => {
            return axios.get(API + "post/like/all?token=" + Script.getCookie("token"), {params: {userId}})
                .then((response) => response)
                .catch((error) => error.response && callback())
        },
        getAllDislikesByUserId: (userId, callback) => {
            return axios.get(API + "post/dislike/all?token=" + Script.getCookie("token"), {params: {userId}})
                .then((response) => response)
                .catch((error) => error.response && callback())
        },
        createComment: (value, postId, id, userName, comCount, callback, callback1) => {
            return axios.post(API + "post/comment?token=" + Script.getCookie("token"), {
                text: value, postId, userId: id, createdBy: userName, comCount
            })
                .then((response) => callback(response))
                .catch((error) => error.response && callback1())
        },
    },
    MATES: {
        friendRequest: (values, okCallback, errorCallback) => {
            axios.post(API + "mates", values)
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        approveRequest: (values, okCallback, errorCallback) => {
            axios.post(API + "mates/approve", values)
                .then(() => okCallback("Added"))
                .catch((error) => {
                    if (error) {
                        errorCallback("Canceled")
                    }
                })
        },
        rejectRequest: (values, okCallback, errorCallback) => {
            axios.delete(API + "mates/", {data: values})
                .then(() => okCallback("Rejected"))
                .catch((error) => {
                    if (error) {
                        errorCallback("Canceled")
                    }
                })
        },
        getForApprovalMatesList: (receiverId, okCallback, errorCallback) => {
            axios.get(API + "mates/forMe", {params: {receiverId}})
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        getApprovedByMeMatesList: (receiverId, okCallback, errorCallback) => {
            axios.get(API + "mates/approvedByMe", {params: {receiverId}})
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        getMatesList: (requestSendById, okCallback, errorCallback) => {
            axios.get(API + "mates/my", {params: {requestSendById}})
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
    },
    GALLERY: {
        addPhotoToMyGallery: (values, okCallback, errorCallback) => {
            axios.post(API + "gallery", values)
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        getMyGallery: (userId, okCallback, errorCallback) => {
            axios.get(API + "gallery", {params: {userId}})
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        deleteMyPhoto: ({userId, src}, okCallback, errorCallback) => {
            axios.delete(API + "gallery", {params: {userId, src}})
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
    },
    FOLDER: {
        addPhotoToFolder: (values, okCallback, errorCallback) => {
            axios.post(API + "folder", values)
                .then((response) => {
                    okCallback(response?.data);
                })
                .catch((error) => {
                    console.error(error?.response?.data);

                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        updateFolderBack: (values) => {
            return fetch(API + "folder/folderBack", {
                    method: "POST",
                    body: values
                }
            )
        },
        getMyFolders: (userId, okCallback, errorCallback) => {
            axios.get(API + "folder", {params: {userId}})
                .then((response) => {
                    okCallback(response?.data?.clearData);
                })
                .catch((error) => {
                    console.error(error?.response?.data);

                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        deleteImageFromFolder: ({userId, src, id}) => {
            return axios.delete(API + "folder", {params: {userId, src, id}})
        },
        deleteFolder: ({name}) => {
            return axios.delete(API + "folder/root", {params: {name}})
        },
    },
    CHAT: {
        deleteChatMessage: ({id}) => {
            return axios.delete(API + "chat/message", {params: {id}})
        },
        updateChatMessage: (id, value) => {
            return axios.put(API + "chat/", {
                id,
                newText: value
            })
        },
        createChatMessage: (values, okCallback, errorCallback) => {
            axios.post(API + "chat", values)
                .then((response) => {
                    okCallback(response?.data);
                })
                .catch((error) => {
                    console.error(error?.response?.data);

                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        getConversationById: (conversationId, okCallback, errorCallback) => {
            axios.get(API + "chat/conversation", {params: {conversationId}})
                .then((response) => {
                    okCallback(response?.data);
                })
                .catch((error) => {
                    console.error(error?.response?.data);

                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
    },
}

export default Http;