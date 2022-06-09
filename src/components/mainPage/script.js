import HttpHelper from "../../helpers/httpHelper"
import Script from "../../header/script.js"


function UpdateInfo(values, close, history) {
    HttpHelper.userUpdate(values)
    close();
    Script.leave(history)
}

const obj = { UpdateInfo }

export default obj;