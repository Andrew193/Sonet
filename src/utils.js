import {v4 as uuidv4} from 'uuid';

export function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

export function createErrorsForApiCall(parsedResponse, oneErrorMessage) {

    return parsedResponse
        ? Object.entries(parsedResponse)
            ?.map((error) => {
                if(JSON.stringify(error[1]) === "{}") {
                    return null;
                }
                return <li
                    key={uuidv4()}>{error[0] === "error" ? "Main reason" : error[0]}: {error[1]?.wrong || error[1]}</li>
            })
        : <li key={uuidv4()}>{oneErrorMessage?.error || "Something went wrong"}</li>;
}