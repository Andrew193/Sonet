import Script from "../helpers/cookieHelper";
import htmlHelper from "../helpers/htmlHelper";
import HttpHelper from "../helpers/httpHelper";
import CommonHelper from "../helpers/common";
import {getItemFromLocalStorage} from "../localStorageService";

function leave(history) {
    Script.removeCookie("token");
    CommonHelper.redirect(history, null, "/auth")
}

function GetShortUserInfo(notify) {
    const token = Script.getCookie("token");

    if (token) {
        return HttpHelper.USERS.getMe((error) => {
            const inner = htmlHelper.stringFromJSON(error?.data);
            inner[0] !== "<" &&
                notify(htmlHelper.createHTML({ title: "Error", message: inner }));
        })
    }
}
function ToggleStateValue(setFlag) {
    setFlag((prev) => !prev.flag)
}

export function GetInfo() {
    const { userName, id } = getItemFromLocalStorage("userInfo");
    return { userName, id };
}

const obj = { leave, GetShortUserInfo, ToggleStateValue, GetInfo }

export default obj;