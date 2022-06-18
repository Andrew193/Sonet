import HttpHelper from "../helpers/httpHelper";

export async function createChatMessage(values, okCallback, errorCallback) {
    HttpHelper.createChatMessage(values, okCallback, errorCallback);
}