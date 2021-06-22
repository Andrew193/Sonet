import cookieHelper from "./cookieHelper.js"
import HttpHelper from "./httpHelper"
import CommonHelper from "./common"
function isElive(history) {
    const token = cookieHelper.getCookie("token");
    token ? HttpHelper.configToken(token, history) : CommonHelper.redirect(history, null, "/auth")
}

const obj = { isElive };

export default obj;