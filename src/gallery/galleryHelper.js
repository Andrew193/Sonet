import HttpHelper from "../helpers/httpHelper";

export async function getMyFolders(userId, okCallback, errorCallback) {
    return HttpHelper.getMyFolders(userId, okCallback, errorCallback)
}

export async function getMyGallery(userId, okCallback, errorCallback) {
    return HttpHelper.getMyGallery(userId, okCallback, errorCallback)
}

export  function updateBackCover(image, openedFolder, setIsOpened, folders, setFolders) {
    let formData = new FormData();
    let fileId;
    formData.append("file", image.files[0]);
    formData.append("name", openedFolder?.name);
    try {
        fileId = JSON.parse(openedFolder?.folderBack)?.fileId
    } catch (error) {
        fileId = null;
    }

    formData.append("fileId", fileId)
    updateFolderBack(formData)
        .then(async (response) => {
            const newBack = await response?.json();
            const newFolders = folders?.map((folder) => folder?.name === openedFolder?.name
                ? {...folder, folderBack: JSON.stringify(newBack?.reason)}
                : folder
            )

            setFolders(() => JSON.parse(JSON.stringify(newFolders)))
            setTimeout(() => {
                setIsOpened(() => false)
            }, 1000)
        })
}

export async function deleteMyPhoto({userId, src}, okCallback, errorCallback) {
    return HttpHelper.deleteMyPhoto({userId, src}, okCallback, errorCallback)
}

export async function deleteImageFromFolder({userId, src, id}) {
    return HttpHelper.deleteImageFromFolder({userId, src, id})
}

export async function deleteFolder({name}) {
    return HttpHelper.deleteFolder({name})
}

export async function addPhotoToFolder(values, setFolders) {
    return HttpHelper.addPhotoToFolder(values, (response) => {
        setFolders((state) => {
            return response?.data[1] ? [...(state || []), response?.data[0]] : state;
        })
    }, (error) => {
        console.log(error)
    })
}

export async function updateFolderBack(values) {
    return HttpHelper.updateFolderBack(values);
}