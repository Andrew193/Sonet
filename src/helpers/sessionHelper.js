import cookieHelper from "./cookieHelper.js"
import HttpHelper from "./httpHelper"
import CommonHelper from "./common"
import {deleteItemFromLocalStorage} from "../localStorageService";
import {USER_INFORMATION} from "../vars";

function isElive(history) {
    const token = cookieHelper.getCookie("token");
    if (token) {
        HttpHelper.configToken(token, history)
    } else {
        deleteItemFromLocalStorage(USER_INFORMATION);
        CommonHelper.redirect(history, null, "/auth");
    }
}

const obj = {
    default: {
        isElive
    }
};

export default obj;