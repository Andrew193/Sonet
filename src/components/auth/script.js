const axios = require('axios').default;
function reset(token, seter, resetForm) {
    document.cookie = `token=${token}`;
    resetForm();
    seter(true);
}
function sendReq(values, resetForm, flag, seter, toast) {
    values.userName = "Default"
    flag ?
        axios.post("https://sonet34.herokuapp.com/api/users", values)
            .then((response) => {
                reset(response.data.token, seter, resetForm)
                setTimeout(() => {
                    window.location.reload()
                }, 150);
            })
            .catch((error) => error && toast("User already exist"))
        :
        axios.get("https://sonet34.herokuapp.com/api/users/auth", { params: values })
            .then((response) => {
                reset(response.data.token, seter, resetForm)
                setTimeout(() => {
                    window.location.reload()
                }, 150);
            })
            .then((error) => error && toast(error.response.data.error))
}

module.exports = { sendReq };