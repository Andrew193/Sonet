import withPageHeader from "../hoc/withPageHeader";
import FollowersCreator from "./Creator";

function FollowingsPageContentWrapper(props) {
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

export default withPageHeader(FollowingsPageContentWrapper, {path: "/", Title: "Followings"})