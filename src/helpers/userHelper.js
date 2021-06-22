import HttpHelper from "./httpHelper"
function updateImage(image, endpoint) {
    let formData = new FormData();
    formData.append("file", image.files[0])
    HttpHelper.uploadImg(endpoint, formData)
}

function CallImageInput(inputElement) {
    inputElement.click()
}

const obj = { updateImage, CallImageInput }

export default obj;
