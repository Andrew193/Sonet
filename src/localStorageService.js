export function getItemFromLocalStorage(key, neededValue) {
    const keyValue = JSON.parse(localStorage.getItem(key));
    return neededValue ? (keyValue || {})[neededValue] || "" : keyValue;
}