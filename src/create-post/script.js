import htmlHelper from "../helpers/htmlHelper";
import HttpHelper from "../helpers/httpHelper";
import {notify} from "../App";

function createPostService(element, notify, socket, text, savedImages, possibleMentions, sharedInfo, quiz) {
    HttpHelper.POSTS.createPost(text, (response) => {
        document.querySelector(".Mpost").classList.remove("Open");
        notify(htmlHelper.createHTML({title: "Ok", message: response?.data?.message}));
        socket.emit("postCreate");
    }, (error) => {
        const inner = htmlHelper.stringFromJSON(error?.response?.data)
        notify(htmlHelper.createHTML({title: "Error", message: inner}));
    }, savedImages, possibleMentions, sharedInfo, quiz)
}

export async function SharePost(text, sharedPost) {
    HttpHelper.POSTS.sharePost(text, sharedPost, (response) => {
        notify(htmlHelper.createHTML({title: "Ok", message: response?.data?.message}));
    })
}

export function BookmarkItem(bookmarkConfig) {
    HttpHelper.BOOKMARKS.addItemToBookmarks(bookmarkConfig, (response) => {
        notify(htmlHelper.createHTML({title: "Ok", message: response?.data?.message}));
    })
}

export function DeleteBookmarkItem(bookmarkId) {
    HttpHelper.BOOKMARKS.deleteMyBookmarkById(bookmarkId, (response) => {
        notify(htmlHelper.createHTML({title: "Ok", message: response?.data?.message}));
    })
}

export async function CreatePost(text, notify, element, socket, images, {possibleMentions = [], sharedInfo, quiz}) {
    if (images?.length > 0) {
        const savedImages = [];
        for (let i = 0; i < images?.length; i++) {
            let formData = new FormData();
            formData.append("file", images[i]?.file);
            const response = await HttpHelper.uploadImg("postImage", formData);
            const parsedResponse = await response.json();
            savedImages.push(JSON.stringify(parsedResponse?.reason))
        }
        createPostService(element, notify, socket, text, savedImages, possibleMentions, sharedInfo, quiz)
    } else {
        createPostService(element, notify, socket, text, null, possibleMentions, sharedInfo, quiz)
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