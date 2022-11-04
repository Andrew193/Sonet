import Script from "../helpers/cookieHelper";
import htmlHelper from "../helpers/htmlHelper";
import HttpHelper from "../helpers/httpHelper";
import CommonHelper from "../helpers/common";
import {deleteItemFromLocalStorage, getItemFromLocalStorage} from "../localStorageService";
import {USER_INFORMATION} from "../vars";

function leave(history) {
    Script.removeCookie("token");
    deleteItemFromLocalStorage(USER_INFORMATION);
    CommonHelper.redirect(history, null, "/auth");
}

function GetShortUserInfo(notify) {
    const token = Script.getCookie("token");

    if (token) {
        return HttpHelper.USERS.getMe((error) => {
            const inner = htmlHelper.stringFromJSON(error?.data);
            inner[0] !== "<" &&
            notify(htmlHelper.createHTML({title: "Error", message: inner}));
        })
    }
}

export function GetInfo() {
    const {userName, id} = getItemFromLocalStorage(USER_INFORMATION);
    return {userName: userName || "", id: id || null};
}

const obj = {leave, GetShortUserInfo, GetInfo}

export default obj;