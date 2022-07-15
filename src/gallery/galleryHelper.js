import HttpHelper from "../helpers/httpHelper";

export async function getMyFolders(userId, okCallback, errorCallback) {
    return HttpHelper.getMyFolders(userId, okCallback, errorCallback)
}

export async function getMyGallery(userId, okCallback, errorCallback) {
    return HttpHelper.getMyGallery(userId, okCallback, errorCallback)
}

export async function deleteMyPhoto({userId, src}, okCallback, errorCallback) {
    return HttpHelper.deleteMyPhoto({userId, src}, okCallback, errorCallback)
}

export async function addPhotoToFolder(values, setFolders) {
    return HttpHelper.addPhotoToFolder(values, (response) => {
        setFolders((state) => {
            return [...(state || []), response?.data]
        })
    }, (error) => {
        console.log(error)
    })
}