import HttpHelper from "./httpHelper";

function updateImage(image, endpoint, fileId) {
    let formData = new FormData();
    formData.append("file", image.files[0]);
    formData.append("fileId", fileId)

    return HttpHelper.uploadImg(endpoint, formData);
}

function CallImageInput(inputElement) {
    inputElement.click()
}

const obj = { updateImage, CallImageInput }

export default obj;
