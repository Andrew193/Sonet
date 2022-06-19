import HttpHelper from "../helpers/httpHelper";

export async function createChatMessage(values, okCallback, errorCallback) {
    HttpHelper.createChatMessage(values, okCallback, errorCallback);
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