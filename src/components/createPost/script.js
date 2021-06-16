import axios from "axios";
import htmlHelper from "../../helpers/htmlHelper";

function CreatePost(text, notify, element, socket) {
    axios.post("https://sonet34.herokuapp.com/api/post", { text })
        .then((response) => {
            element.value = "";
            document.querySelector(".Mpost").classList.remove("Open")
            notify(htmlHelper.createHTML({ title: "Ok", message: response.data.message }));
            socket.emit("postCreate");
        })
        .catch((error) => {
            if (error) {
                const inner = htmlHelper.stringFromJSON(error.response.data)
                notify(htmlHelper.createHTML({ title: "Error", message: inner }));
            }
        })
}

const obj={ CreatePost }

export default obj;