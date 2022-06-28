import MatesContainer from "./MatesContainer";
import RequestsContainer from "./RequestsContainer";
import {useMemo, useState} from "react";


function PeopleContainer(props) {
    const {
        chatMode,
        matesList,
        isLoading,
        possibleMatesList,
        setConversations,
        conversations
    } = props;

    const [search, setSearch] = useState("");

    useMemo(() => {
        setConversations((state) =>
            search === ""
                ? conversations?.map((conversation) => ({...conversation, show: true}))
                : state?.map((conversation) =>
                    conversation?.receiverName?.includes(search)
                        ? {...conversation, show: true}
                        : {...conversation, show: false}
                ))
    }, [search])

    return (
        <>
            {
                !chatMode
                && <input
                    placeholder="Search for friends"
                    className="chatMenuInput"
                    onChange={(e) => {
                        setSearch(e.target?.value)
                    }}
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