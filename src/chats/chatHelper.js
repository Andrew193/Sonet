import HttpHelper from "../helpers/httpHelper";
import {notify} from "../App";

export async function createChatMessage(values, okCallback, errorCallback) {
    HttpHelper.createChatMessage(values, okCallback, errorCallback);
}

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        notify('Copying to clipboard was successful!');
    }, () => notify('Could not copy text'));
}

export async function deleteMessageById(id, socket, receiverId) {
    HttpHelper.deleteChatMessage({id})
        .then((response) => {
            if (response?.data?.data?.deleted) {
                socket.emit("updateAfterDeleting", {id: receiverId});
            }
        })
}

export async function updateMessageById(id, newText, socket, receiverId) {
    HttpHelper.updateChatMessage(id, newText)
        .then(() => {
            socket.emit("updateAfterDeleting", {id: receiverId});
        })
}

export async function getConversationById(conversationId, okCallback, errorCallback) {
    HttpHelper.getConversationById(conversationId, okCallback, errorCallback);
}

export async function getMatesList(userId, okCallback, errorCallback) {
    HttpHelper.getMatesList(userId, okCallback, errorCallback)
}

export async function getForApprovalMatesList(userId, okCallback, errorCallback) {
    HttpHelper.getForApprovalMatesList(userId, okCallback, errorCallback)
}

export async function approveFriendRequest(info, okCallback, errorCallback) {
    HttpHelper.approveRequest(info, okCallback, errorCallback)
}

export async function rejectFriendRequest(info, okCallback, errorCallback) {
    HttpHelper.rejectRequest(info, okCallback, errorCallback)
}

export async function approvedByMe(userId, okCallback, errorCallback) {
    HttpHelper.getApprovedByMeMatesList(userId, okCallback, errorCallback)
}