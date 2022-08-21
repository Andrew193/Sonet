import htmlHelper from "../helpers/htmlHelper";
import HttpHelper from "../helpers/httpHelper";

function createPostService(element, notify, socket, text, savedImages) {
    HttpHelper.POSTS.createPost(text, (response) => {
        document.querySelector(".Mpost").classList.remove("Open");

        notify(htmlHelper.createHTML({title: "Ok", message: response?.data?.message}));

        socket.emit("postCreate");
    }, (error) => {
        const inner = htmlHelper.stringFromJSON(error?.response?.data)
        notify(htmlHelper.createHTML({title: "Error", message: inner}));
    }, savedImages)
}

async function CreatePost(text, notify, element, socket, images) {
    if (images?.length > 0) {
        const savedImages = [];

        for (let i = 0; i < images?.length; i++) {
            let formData = new FormData();
            formData.append("file", images[i]?.file);

            const response = await HttpHelper.uploadImg("postImage", formData);
            const parsedResponse = await response.json();

            savedImages.push(JSON.stringify(parsedResponse?.reason))
        }

        createPostService(element, notify, socket, text, savedImages)
    } else {
        createPostService(element, notify, socket, text)
    }
}

function createBlob(callback, file) {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = function () {
        // you can keep blob or save blob to another position
        const blob = new Blob([fileReader.result]);

        // url for download
        const url = URL.createObjectURL(blob);

        callback(url)
    }
}

const obj = {CreatePost, createBlob}

export default obj;