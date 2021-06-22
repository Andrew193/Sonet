import Script from "../../helpers/cookieHelper";
import htmlHelper from "../../helpers/htmlHelper";
import HttpHelper from "../../helpers/httpHelper"
import CommonHelper from "../../helpers/common"
function leave(history) {
    Script.removeCookie("token");
    CommonHelper.redirect(history, null, "/auth")
}
function GetShortUserInfo(notify) {
    const token = Script.getCookie("token")
    if (token) {
        return HttpHelper.getMe((error) => {
            const inner = htmlHelper.stringFromJSON(error.data);
            inner[0] !== "<" &&
                notify(htmlHelper.createHTML({ title: "Error", message: inner }));
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

const obj = { leave, GetShortUserInfo, realOpen, GetInfo }

export default obj;