import withPageHeader from "../hoc/withPageHeader";
import FollowersCreator from "../followings/Creator";
import {FollowersPropsType} from "./FollowersPageContainer";

function FollowersPageContent(props: FollowersPropsType) {
    const {
        users
    } = props;

    return (<FollowersCreator usersList={users}/>)
}

export default withPageHeader(FollowersPageContent, {path: "/profile", Title: "Followers"})