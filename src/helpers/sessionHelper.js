import CookieHelper from "./cookieHelper.js"
import HttpHelper from "./httpHelper"
import CommonHelper from "./common"
import {deleteItemFromLocalStorage} from "../localStorageService";
import {headerListLinks, USER_INFORMATION} from "../vars";

function isTokenAlive(history) {
    const token = CookieHelper.getCookie("token");
    if (token) {
        HttpHelper.configToken(token, history)
    } else {
        deleteItemFromLocalStorage(USER_INFORMATION);
        CommonHelper.redirect(history, null, headerListLinks.auth);
    }
}

const obj = {
    default: {
        isTokenAlive
    }
};

export default obj;