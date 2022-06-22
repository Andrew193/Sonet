import MatesConditions from "./MatesConditions";

function MatesContainer(props) {
    const {
        matesList,
        isLoading
    } = props;

    return(
        <>
            <h3>Mates</h3>
            {matesList}
            <MatesConditions
                matesListLength={matesList?.length}
                isLoading={isLoading}
            />
        </>
    )
}

export default MatesContainer;