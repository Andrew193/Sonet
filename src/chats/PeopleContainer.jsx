import MatesContainer from "./MatesContainer";
import RequestsContainer from "./RequestsConditions";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import textareaStyles from "../components/solid-textarea/solid-textarea.module.css"

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

    useEffect(() => {
        setConversations((state) =>
            search === ""
                ? conversations?.map((conversation) => ({...conversation, show: true}))
                : state?.map((conversation) =>
                    conversation?.receiverName?.includes(search)
                        ? {...conversation, show: true}
                        : {...conversation, show: false}
                ))
    }, [search])

    const {t} = useTranslation();

    return (
        <>
            {
                !chatMode
                &&
                <>
                    <input
                        id={"FocusInput"}
                        placeholder={t("Search for friend")}
                        className="chatMenuInput"
                        onChange={(e) => {
                            setSearch(e.target?.value)
                        }}
                    />
                    <div className={textareaStyles.ThematicBreak}/>
                </>
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