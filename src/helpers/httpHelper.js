import cookieHelper from "./cookieHelper"
import CommonHelper from "./common"
import Script from "./cookieHelper";
import {createErrorsForApiCall} from "../utils";
import {notify} from "../App";
import {img_api} from "../vars";

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
        axios.get("/api/token/configToken", {params: {token}})
            .then(_ => {
            }).catch((error) => {
            if (error) {
                cookieHelper.removeCookie("token")
                CommonHelper.redirect(history, null, "/auth")
            }
        })
    },
    subscribe: (id, otherUserFolCount, toast) => {
        axios.post("/api/subscribe?token=" + Script.getCookie("token"), {
            userId: id,
            otherUserFolCount
        })
            .then((response) => toast(response?.data?.message))
            .catch((error) => error.response && console.error(error.response))
    },
    QUIZ: {
        setQuiz: (postId, answer, parsedQuiz, userId, selectedQuizAnswerCount) => {
            return axios.put("/api/post/quiz", {
                id: postId,
                userId: userId,
                quizAnswer: answer,
                quiz: parsedQuiz,
                selectedQuizAnswerCount
            })
                .then((response) => response)
                .catch((error) => error.response)
        },
    },
    USERS: {
        getAllUsers: () => {
            return axios.get("/api/users")
                .then((response) => response?.data)
                .catch((error) => error.response && console.error(error.response))
        },
        confirm: (phone, email) => {
            axios.post("/api/users/confirm?token=" + Script.getCookie("token"), {phone, email})
        },
        getOneObj: (id) => {
            return axios.get("/api/users/getOneObj?token=" + Script.getCookie("token"), {params: {id}})
                .then((response) => response)
                .catch((error) => error)
        },
        getUserByName: (name) => {
            return axios.get("/api/users/getUserByName?token=" + Script.getCookie("token"), {params: {name}})
                .then((response) => response)
                .catch((error) => error)
        },
        getOneUser: (id) => {
            return axios.get("/api/users/getOne", {params: {id}})
                .then((response) => response?.data)
                .catch((error) => error.response && console.error(error.response))
        },
        resetPassword: (email) => {
            notify("Your request has been sent successfully")
            return axios.get("/api/users/newPassword", {params: {email}})
                .then((response) => response)
                .catch((error) => error)
        },
        userUpdate: (values) => {
            axios.put("/api/users/update", values)
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
            return axios.get("/api/users/me?token=" + Script.getCookie("token"))
                .then((response) => response)
                .catch((error) => error.response && callback(error.response))
        },
        createUser: (values, okCallback, errorCallback) => {
            axios.post("/api/users", values)
                .then((response) => okCallback(response?.data?.token))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        authUser: (values, callback, callback1) => {
            axios.get("/api/users/auth", {params: values})
                .then((response) => callback(response?.data?.token))
                .catch((error) => error?.response && callback1(error?.response?.data?.error))
        },
    },
    FOLLOW: {
        follow: (idArray, history, type) => {
            axios.get("/api/follow?token=" + Script.getCookie("token"), {params: {idArray: JSON.stringify(idArray)}})
                .then((response) => CommonHelper.redirect(history, response?.data, "/followers" + type))
                .catch((error) => error.response && console.error(error?.response?.data?.error))
        },
        followingArray: (callback, history, myId) => {
            axios.get("/api/follow/followingsArray?token=" + Script.getCookie("token"), {params: {myId}})
                .then((response) => {
                    const idArray = response?.data?.length?.reduce((prev, curr) => [...prev, +curr.userId], [])
                    callback(idArray, history)
                })
                .catch((error) => error.response && console.error(error?.response?.data?.error))
        },
        followersArray: (callback, history, myId) => {
            axios.get("/api/follow/followersArray?token=" + Script.getCookie("token"), {params: {myId}})
                .then((response) => {
                    const idArray = response?.data?.length?.reduce((prev, curr) => [...prev, +curr.userId], [])
                    callback(idArray, history)
                })
                .catch((error) => error?.response && console.error(error?.response?.data?.error))
        },
        followerById: (myId, followerId) => {
            return axios.get("/api/follow/followerById?token=" + Script.getCookie("token"), {
                params: {
                    myId,
                    followerId
                }
            })
                .then((response) => response.data)
                .catch((error) => error?.response && console.error(error?.response?.data?.error))
        },
    },
    POSTS: {
        getPosts: (count, prefix, search = "") => {
            return axios.get(`/api/post${prefix ? `/${prefix}` : ""}?token=` + Script.getCookie("token") + search, {params: {howMany: count}})
                .then((response) => response?.data)
                .catch((error) => error.response && console.error(error.response))
        },
        getPCount: (id, set) => {
            axios.get("/api/post/count?token=" + Script.getCookie("token"), {params: {id}})
                .then((response) => set(response?.data?.count))
                .catch((error) => error.response && console.error(error.response))
        },
        getOnePost: (id, notify) => {
            return axios.get("/api/post/getOne?token=" + Script.getCookie("token"), {params: {id}})
                .then((response) => response?.data)
                .catch((error) => error?.response && notify(error?.response?.data?.posts))
        },
        complexEmotions: ({emotionType, userId, value, emotionCount}, okCallback, errorCallback) => {
            return axios.put("/api/post/complexEmotion", {
                ...value,
                emotionType,
                selectedEmotionCount: emotionCount,
                postText: JSON.stringify(value),
                userId,
            })
                .then((response) => okCallback())
                .catch((error) => error.response && errorCallback(error))
        },
        emotion: (userId, value, callback, callback1, emType) => {
            axios.put("/api/post/" + emType, {
                userId,
                ...value,
                postText: JSON.stringify(value)
            })
                .then((response) => callback())
                .catch((error) => error.response && callback1(error))
        },
        getPostWithType: (id, setPosts, endpoint) => {
            axios.get("/api/post/" + endpoint + "?token=" + Script.getCookie("token"), {params: {userId: id}})
                .then((response) => setPosts({posts: response?.data?.posts}))
                .catch((error) => console.log(error))
        },
        deletePostById: (id, setPosts, savedImages) => {
            axios.delete("/api/post/" + "?token=" + Script.getCookie("token"), {
                params: {
                    postId: id,
                    savedImages: savedImages
                }
            })
                .then((response) => setPosts({posts: response?.data?.posts}))
                .catch((error) => console.log(error))
        },
        updatePostById: ({id, newText}, setPosts) => {
            axios.put("/api/post/" + "?token=" + Script.getCookie("token"), {
                params: {
                    postId: id,
                    newText
                }
            })
                .then((response) => setPosts({posts: response?.data?.posts}))
                .catch((error) => console.log(error))
        },
        createPost: (text, callback, callback1, savedImages, possibleMentions, sharedInfo, quiz) => {
            axios.post("/api/post?token=" + Script.getCookie("token"), {
                text,
                savedImages: JSON.stringify(savedImages || []),
                possibleMentions: JSON.stringify(possibleMentions || []),
                sharedInfo: sharedInfo,
                quiz: quiz
            })
                .then((response) => callback(response))
                .catch((error) => error && callback1(error))
        },
        sharePost: (text, sharedPost, callback) => {
            axios.post("/api/post/share?token=" + Script.getCookie("token"), {
                text,
                shared: JSON.stringify(sharedPost)
            })
                .then((response) => callback(response))
                .catch((error) => console.error(error))
        },
        getAllComments: (id, callback) => {
            return axios.get("/api/post/comment?token=" + Script.getCookie("token"), {params: {id}})
                .then((response) => response)
                .catch((error) => error.response && callback())
        },
        getAllCommentsByUserId: (userId, callback) => {
            return axios.get("/api/post/comment/id?token=" + Script.getCookie("token"), {params: {id: userId}})
                .then((response) => response)
                .catch((error) => error.response && callback())
        },
        getAllLikesByUserId: (userId, callback) => {
            return axios.get("/api/post/like/all?token=" + Script.getCookie("token"), {params: {userId}})
                .then((response) => response)
                .catch((error) => error.response && callback())
        },
        getAllDislikesByUserId: (userId, callback) => {
            return axios.get("/api/post/dislike/all?token=" + Script.getCookie("token"), {params: {userId}})
                .then((response) => response)
                .catch((error) => error.response && callback())
        },
        createComment: (value, postId, id, userName, comCount, callback, callback1) => {
            return axios.post("/api/post/comment?token=" + Script.getCookie("token"), {
                text: value, postId, userId: id, createdBy: userName, comCount
            })
                .then((response) => callback(response))
                .catch((error) => error.response && callback1())
        },
    },
    MATES: {
        friendRequest: (values, okCallback, errorCallback) => {
            axios.post("/api/mates", values)
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        approveRequest: (values, okCallback, errorCallback) => {
            axios.post("/api/mates/approve", values)
                .then(() => okCallback("Added"))
                .catch((error) => {
                    if (error) {
                        errorCallback("Canceled")
                    }
                })
        },
        rejectRequest: (values, okCallback, errorCallback) => {
            axios.delete("/api/mates/", {data: values})
                .then(() => okCallback("Rejected"))
                .catch((error) => {
                    if (error) {
                        errorCallback("Canceled")
                    }
                })
        },
        getForApprovalMatesList: (receiverId, okCallback, errorCallback) => {
            axios.get("/api/mates/forMe", {params: {receiverId}})
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        getApprovedByMeMatesList: (receiverId, okCallback, errorCallback) => {
            axios.get("/api/mates/approvedByMe", {params: {receiverId}})
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        getMatesList: (requestSendById, okCallback, errorCallback) => {
            axios.get("/api/mates/my", {params: {requestSendById}})
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
    },
    BOOKMARKS: {
        addItemToBookmarks: (values, okCallback, errorCallback) => {
            axios.post("/api/bookmarks", values)
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        getMyBookmarks: (userId, okCallback, errorCallback) => {
            axios.get("/api/bookmarks", {params: {userId}})
                .then((response) => okCallback(response?.data.clearData))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        deleteMyBookmarkById: (id, okCallback, errorCallback) => {
            axios.delete("/api/bookmarks", {params: {id}})
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
            axios.post("/api/gallery", values)
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        getMyGallery: (userId, okCallback, errorCallback) => {
            axios.get("/api/gallery", {params: {userId}})
                .then((response) => okCallback(response?.data))
                .catch((error) => {
                    if (error) {
                        errorCallback(createErrorsForApiCall(error?.response?.data, error?.response?.data))
                    }
                })
        },
        deleteMyPhoto: ({userId, src}, okCallback, errorCallback) => {
            axios.delete("/api/gallery", {params: {userId, src}})
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
            axios.post("/api/folder", values)
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
            return fetch("/api/folder/folderBack", {
                    method: "POST",
                    body: values
                }
            )
        },
        getMyFolders: (userId, okCallback, errorCallback) => {
            axios.get("/api/folder", {params: {userId}})
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
            return axios.delete("/api/folder", {params: {userId, src, id}})
        },
        deleteFolder: ({name}) => {
            return axios.delete("/api/folder/root", {params: {name}})
        },
    },
    CHAT: {
        deleteChatMessage: ({id}) => {
            return axios.delete("/api/chat/message", {params: {id}})
        },
        updateChatMessage: (id, value) => {
            return axios.put("/api/chat/", {
                id,
                newText: value
            })
        },
        createChatMessage: (values, okCallback, errorCallback) => {
            axios.post("/api/chat", values)
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
            axios.get("/api/chat/conversation", {params: {conversationId}})
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