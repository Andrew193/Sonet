import {v4 as uuidv4} from 'uuid';

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