import MatesContainer from "./MatesContainer";
import RequestsContainer from "./RequestsContainer";


function PeopleContainer(props) {
    const {
        chatMode,
        matesList,
        isLoading
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
                        possibleMatesList
                    />
            }
        </>
    )
}

export default PeopleContainer;