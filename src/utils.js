import { v4 as uuidv4 } from 'uuid';

export function createErrorsForApiCall(parsedResponse, oneErrorMessage) {

    return parsedResponse
        ? Object.entries(parsedResponse)
            ?.map((error) => {
                return <li
                    key={uuidv4()}>{error[0] || error[0]}: {error[1]?.join(".\n")}</li>
            })
        : <li key={uuidv4()}>{oneErrorMessage?.error || "Something went wrong"}</li>;
}