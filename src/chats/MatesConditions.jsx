import Loader from "../components/common/spinner/Spinner";
import {MdSentimentVeryDissatisfied} from "react-icons/all";


function MatesConditions(props) {
    const {
        matesListLength,
        isLoading
    } = props;

    return(
        <>
            {
                (isLoading && !matesListLength) &&
                <div
                    className={"chatLoader"}
                >
                    <Loader/>
                </div>
            }
            {
                (!isLoading && !matesListLength) &&
                <div className={"lonelyLine"}>
                    <MdSentimentVeryDissatisfied/>
                    <span>You are lonely))</span>
                </div>
            }
        </>
    )
}

export default MatesConditions;