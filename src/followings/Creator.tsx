import {AiOutlineMail, AiOutlineNumber, AiOutlineUser} from "react-icons/ai";
import {useHistory} from "react-router";
import Script from "../users/script"
import {useMemo} from "react";
import {FollowersUsers} from "../followers/FollowersPageContainer";

type FollowersCreatorType = {
    usersList: FollowersUsers
}

function FollowersCreator(props: FollowersCreatorType) {
    const {
        usersList
    } = props;

    const history = useHistory();

    const mappedUsersList = useMemo(() => {
        return usersList.map((value: FollowersUsers[number], index: number) =>
            <div
                key={index}
                className={"followerOrFollowingContainer"}
                onClick={() => {
                    Script.openUserProfile(+value.id, history)
                }}
            >
                <h3 className={"authorName"}>
                    <AiOutlineUser/>{value.userName}
                </h3>
                <span>
                    <AiOutlineMail/>
                    <a href={`mailto:${value.email}`}>{value.email}</a>
                </span>
                <span>
                    <AiOutlineNumber/>{value.id}
                </span>
            </div>)
    }, [history, usersList]);

    return (<>{mappedUsersList}</>)
}

export default FollowersCreator;