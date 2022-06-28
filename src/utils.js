import {v4 as uuidv4} from 'uuid';

export function downloadFile(url, name) {
    const link = document.createElement('a');
    link.href = url;
    link.download = name || 'Download.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
}

export function downloadFileVersion2(url, name) {
    const link = document.createElement("a");
    link.href = url
    link.download = name || "filename.png";
    link.click();
}

export async function createFile(src){
    let response = await fetch(src);
    let data = await response.blob();
    let metadata = {
        type: 'image/png'
    };
    return new File([data], "test.png", metadata);
}

export function hexToRgb(hex) {
    if (hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    return {};
}

export function createErrorsForApiCall(parsedResponse, oneErrorMessage) {

    return parsedResponse
        ? Object.entries(parsedResponse)
            ?.map((error) => {
                if (JSON.stringify(error[1]) === "{}") {
                    return null;
                }
                return <li
                    key={uuidv4()}>{error[0] === "error" ? "Main reason" : error[0]}: {error[1]?.wrong || error[1]}</li>
            })
        : <li key={uuidv4()}>{oneErrorMessage?.error || "Something went wrong"}</li>;
}

export function createCopy(item) {
    return JSON.parse(JSON.stringify(item))
}