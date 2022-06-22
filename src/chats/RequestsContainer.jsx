import RequestsConditions from "./RequestsConditions";


function RequestsContainer(props) {
    const {
        possibleMatesList
    } = props;

    return(
        <>
            <h3>Requests</h3>
            {possibleMatesList}
            <RequestsConditions
                possibleMatesListLength={possibleMatesList?.length}
            />
        </>
    )
}

export default RequestsConditions