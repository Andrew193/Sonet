import cookieHelper from "./cookieHelper.js"
const axios = require('axios').default;
function isElive(history) {
    const token = cookieHelper.getCookie("token");
    if (token) {
        axios.get("https://sonet34.herokuapp.com/api/token/configToken", { params: { token: token } })
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                if (error) {
                    cookieHelper.removeCookie("token")
                    history.push("/auth")
                }
            })
    } else {
        history.push("/auth")
    }
}

const obj={ isElive };

export default obj;