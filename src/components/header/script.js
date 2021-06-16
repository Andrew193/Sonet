import axios from "axios";
import Script from "../../helpers/cookieHelper";
import htmlHelper from "../../helpers/htmlHelper";

function leave(history) {
    Script.removeCookie("token");
    history.push("/auth")
}
function GetShortUserInfo(notify) {
    const token = Script.getCookie("token")
    if (token) {
        return axios.get("https://sonet34.herokuapp.com/api/users/me")
            .then((response) => response)
            .catch((error) => {
                if (error) {
                    const inner = htmlHelper.stringFromJSON(error.response.data);
                    inner[0] !== "<" &&
                        notify(htmlHelper.createHTML({ title: "Error", message: inner }));
                }
            })
    } 
}
function realOpen(setFlag) {
    setFlag((prev) => !prev.flag)
    setTimeout(() => setFlag((prev) => false), 3000)
}
function GetInfo() {
    const { userName, id } = JSON.parse(localStorage.getItem("userInfo"));
    return { userName, id };
}

const obj={ leave, GetShortUserInfo, realOpen, GetInfo }

export default obj;