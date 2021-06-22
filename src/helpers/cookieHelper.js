
function getCookie(value) {
    const spdString = {};
    document.cookie.split(";").forEach((value) => {
        const upValue = value.trim().split("=");
        spdString[upValue[0]] = upValue[1];
    })
    return spdString[value];
}
function removeCookie(valueToRemove) {
    document.cookie = `${valueToRemove}="";  max-age=0`;
}
function refreshCookie(name, value) {
    removeCookie(name);
    document.cookie = `${name}=${value}`;
}
module.exports = { getCookie, removeCookie, refreshCookie };