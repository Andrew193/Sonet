import HttpHelper from "../../helpers/httpHelper"
function reset(token, seter, resetForm) {
    document.cookie = `token=${token}`;
    resetForm();
    seter(true);
}
function comboReset(token, seter, resetForm) {
    reset(token, seter, resetForm)
    setTimeout(() => window.location.reload(), 150);
}
function sendReq(values, resetForm, flag, seter, toast) {
    values.userName = "Default"
    flag ? HttpHelper.createUser(values, (token) => comboReset(token, seter, resetForm), () => toast("User already exist"))
        : HttpHelper.authUser(values, (token) => comboReset(token, seter, resetForm), (error) => toast(error))
}

export default sendReq;