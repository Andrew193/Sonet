
function SaveInfo(info) {
    localStorage.setItem("userInfo", JSON.stringify(info))
}

const obj={ SaveInfo }

export default obj;