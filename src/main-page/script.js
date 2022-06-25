import HttpHelper from "../helpers/httpHelper"
import Script from "../header/script.js"


function UpdateInfo(values, close) {
    HttpHelper.userUpdate(values)
    close();
}

const obj = { UpdateInfo }

export default obj;