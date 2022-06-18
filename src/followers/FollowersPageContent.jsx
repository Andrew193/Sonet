import withPageHeader from "../hoc/withPageHeader";
import FollowersCreator from "../followings/Creator";

function FollowersPageContent(props) {
    const {
        users
    } = props;

    return (
        <>
            <FollowersCreator
                usersList={users}
            />
        </>
    )
}

export default withPageHeader(FollowersPageContent, {path: "/", Title: "Followers"})