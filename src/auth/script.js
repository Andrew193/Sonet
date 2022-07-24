import HttpHelper from "../helpers/httpHelper"

function reset(token, seter, resetForm) {
    document.cookie = `token=${token}`;
    resetForm();
    seter(true);
}

function comboReset(token, seter, resetForm) {
    reset(token, seter, resetForm)
    setTimeout(() => window.location.reload(), 150);
}

function sendReq(values, resetForm, isRegisterUser, setRedirect, toast) {
    values.userName = "Default";

    if (isRegisterUser) {
        HttpHelper.USERS.createUser(values, (token) => {
            comboReset(token, setRedirect, resetForm);
        }, (error) => {
            toast(error || "User already exist");
        })
    } else {
        HttpHelper.USERS.authUser(values, (token) => {
            comboReset(token, setRedirect, resetForm);
        }, (error) => {
            toast(error);
        })
    }
}

export default {sendReq};