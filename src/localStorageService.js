export function getItemFromLocalStorage(key, neededValue) {
    const item = localStorage.getItem(key);
    const parsedItem = item === "undefined" ? null : item;
    const keyValue = JSON.parse(parsedItem || "{}");
    return neededValue ? (keyValue || {})[neededValue] || "" : keyValue;
}

export function deleteItemFromLocalStorage(key) {
    return localStorage.removeItem(key);
}