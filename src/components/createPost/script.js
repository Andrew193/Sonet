import axios from "axios";
import htmlHelper from "../../helpers/htmlHelper";

function CreatePost(text, notify, element, socket, image) {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post("https://upload.gyazo.com/api/upload",{ imagedata: image.files[0],
    access_token: "a67fba00793a37c657fcef36316ce5858e7e9e10bdd2ed5366fd22ad8baeb32a"})
    .then((e)=>console.log(e))
    .catch((r)=>console.log(r))
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

function AddImage(image) {
    image.click()
}

const obj = { CreatePost, AddImage }

export default obj;