import axios from "axios";
import htmlHelper from "../../helpers/htmlHelper";
import HttpHelper from "../../helpers/httpHelper"

function CreatePost(text, notify, element, socket) {
    HttpHelper.createPost(text, (response) => {
        element.value = "";
        document.querySelector(".Mpost").classList.remove("Open")
        notify(htmlHelper.createHTML({ title: "Ok", message: response?.data?.message }));
        socket.emit("postCreate");
    }, (error) => {
        const inner = htmlHelper.stringFromJSON(error?.response?.data)
        notify(htmlHelper.createHTML({ title: "Error", message: inner }));
    })
}

const obj = { CreatePost }

export default obj;