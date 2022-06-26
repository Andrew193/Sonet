import htmlHelper from "../helpers/htmlHelper";
import HttpHelper from "../helpers/httpHelper";
import userHelper from "../helpers/userHelper";

function createPostService(element, notify, socket, text) {
    HttpHelper.createPost(text, (response) => {
        element.value = "";
        document.querySelector(".Mpost").classList.remove("Open")
        notify(htmlHelper.createHTML({title: "Ok", message: response?.data?.message}));
        socket.emit("postCreate");
    }, (error) => {
        const inner = htmlHelper.stringFromJSON(error?.response?.data)
        notify(htmlHelper.createHTML({title: "Error", message: inner}));
    })
}

async function CreatePost(text, notify, element, socket, images) {
    if (images?.length > 0) {
        for (let i = 0; i < images?.length; i++) {
            const response = await userHelper.updateImage(images[i]?.file, "postImage");

            console.log(response, i)
        }
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