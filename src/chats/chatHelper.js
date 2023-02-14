import HttpHelper from "../helpers/httpHelper";
import {notify} from "../App";

export async function createChatMessage(values, okCallback, errorCallback) {
    HttpHelper.CHAT.createChatMessage(values, okCallback, errorCallback);
}

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => notify('Copying to clipboard was successful!'), () => notify('Could not copy text'));
}

export async function deleteMessageById(id, socket, receiverId) {
    HttpHelper.CHAT.deleteChatMessage({id})
        .then((response) => {
            if (response?.data?.data?.deleted) {
                socket.emit("updateAfterDeleting", {id: receiverId});
            }
        })
}

export async function updateMessageById(id, newText, socket, receiverId) {
    HttpHelper.CHAT.updateChatMessage(id, newText)
        .then(() => socket.emit("updateAfterDeleting", {id: receiverId}))
}

export async function getConversationById(conversationId, okCallback, errorCallback) {
    HttpHelper.CHAT.getConversationById(conversationId, okCallback, errorCallback);
}

export async function getMatesList(userId, okCallback, errorCallback) {
    HttpHelper.MATES.getMatesList(userId, okCallback, errorCallback)
}

export async function getForApprovalMatesList(userId, okCallback, errorCallback) {
    HttpHelper.MATES.getForApprovalMatesList(userId, okCallback, errorCallback)
}

export async function approveFriendRequest(info, okCallback, errorCallback) {
    HttpHelper.MATES.approveRequest(info, okCallback, errorCallback)
}

export async function rejectFriendRequest(info, okCallback = () => {
    //spare
}, errorCallback = () => {
    //spare
}) {
    HttpHelper.MATES.rejectRequest(info, okCallback, errorCallback)
}

export async function approvedByMe(userId, okCallback, errorCallback) {
    HttpHelper.MATES.getApprovedByMeMatesList(userId, okCallback, errorCallback)
}