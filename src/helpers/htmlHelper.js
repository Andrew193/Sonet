function createHTML(info) {
    const { title, message } = info;
    return <>
        <h3>{title}</h3>
        <p>{message}</p>
    </>
}
function stringFromJSON(json) {
    if(json) {
        return Object.values(json).reduce((value, curr) => value += Object.values(curr).join(". "), "")
    }
    return null;
}

const obj={ createHTML, stringFromJSON };

export default obj;