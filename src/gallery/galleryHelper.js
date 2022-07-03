import HttpHelper from "../helpers/httpHelper";


export async function getMyGallery(userId, okCallback, errorCallback) {
    return HttpHelper.getMyGallery(userId, okCallback, errorCallback)
}

export async function deleteMyPhoto({userId, src}, okCallback, errorCallback) {
    return HttpHelper.deleteMyPhoto({userId, src}, okCallback, errorCallback)
}