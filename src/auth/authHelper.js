import HttpHelper from "../helpers/httpHelper"

function ResetDocumentCookie(token, setter, resetForm) {
    document.cookie = `token=${token}`;
    resetForm();
    setter(true);
}

function comboReset(token, setter, resetForm) {
    ResetDocumentCookie(token, setter, resetForm);
    setTimeout(() => window.location.reload(), 150);
}

function AuthPageSubmitCover(values, ResetForm, isRegisterUser, setRedirect, toast) {
    values.userName = "Default";

    if (isRegisterUser) {
        HttpHelper.USERS.createUser(values, (token) => comboReset(token, setRedirect, ResetForm), (error) => toast(error || "User already exist"));
    } else {
        HttpHelper.USERS.authUser(values, (token) => comboReset(token, setRedirect, ResetForm), (error) => toast(error));
    }
}

export default {AuthPageSubmitCover};