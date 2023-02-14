import {USER_INFORMATION} from "../vars";

function SaveInfo(info) {
    localStorage.setItem(USER_INFORMATION, JSON.stringify(info))
}

const obj={ SaveInfo }

export default obj;