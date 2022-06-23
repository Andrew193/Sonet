import {AiOutlineClose} from "react-icons/all";

function RequestsConditions(props) {
    const {
        possibleMatesList
    } = props;

    return (
        <>
            {
                possibleMatesList.every(v => v === null)
                    ?
                    <div className={"lonelyLine"}>
                        <AiOutlineClose/>
                        <span>Out of requests</span>
                    </div>
                    : <>{possibleMatesList}</>
            }
        </>
    )
}

export default RequestsConditions;