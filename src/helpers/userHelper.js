

function updateAvatar(image) {
    let formData = new FormData();
    formData.append("file", image.files[0])
    fetch("https://sonet34.herokuapp.com/api/img/setAvatar",
        {
            method: "POST",
            body: formData
        }
    )
}

function CallImageInput(inputElement) {
    inputElement.click()
}

const obj = { updateAvatar, CallImageInput }

module.exports = obj;
