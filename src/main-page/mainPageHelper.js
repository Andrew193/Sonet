import HttpHelper from "../helpers/httpHelper"

function UpdateInfo(values, close) {
    HttpHelper.USERS.userUpdate(values)
    close();
}

const obj = { UpdateInfo }

export default obj;