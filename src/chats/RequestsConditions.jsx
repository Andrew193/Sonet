import {AiOutlineClose} from "react-icons/all";

function RequestsConditions(props) {
    const {
        possibleMatesListLength
    } = props;

    return (
        <>
            {
                possibleMatesListLength === 0
                    ?
                    <div className={"lonelyLine"}>
                        <AiOutlineClose/>
                        <span>Out of requests</span>
                    </div>
                    : null
            }
        </>
    )
}

export default RequestsConditions;