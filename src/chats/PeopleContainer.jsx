import MatesContainer from "./MatesContainer";
import RequestsContainer from "./RequestsContainer";


function PeopleContainer(props) {
    const {
        chatMode,
        matesList,
        isLoading,
        possibleMatesList
    } = props;

    return(
        <>
            {
                !chatMode
                && <input
                    placeholder="Search for friends"
                    className="chatMenuInput"
                />
            }
            {
                !chatMode
                    ? <MatesContainer
                        matesList={matesList}
                        isLoading={isLoading}
                    />
                    : <RequestsContainer
                        possibleMatesList={possibleMatesList}
                        possibleMatesListLength={possibleMatesList?.length}
                    />
            }
        </>
    )
}

export default PeopleContainer;