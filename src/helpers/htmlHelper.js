function createHTML(info) {
    const { title, message } = info;
    return <>
        <h3>{title}</h3>
        <p>{message}</p>
    </>
}
function stringFromJSON(json) {
    return Object.values(json).reduce((value, curr) => value += Object.values(curr).join(". "), "")
}

const obj={ createHTML, stringFromJSON };

export default obj;