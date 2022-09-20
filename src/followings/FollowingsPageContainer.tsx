import {withRouter} from "react-router-dom";
import FollowingsPageContent from "./FollowingsPageContent";
import {FollowersFollowingCover, FollowersType} from "../followers/FollowersPageContainer";

function Followers(props: FollowersType) {
    const users = props.location.state.users;

    return (
        <FollowersFollowingCover>
            <FollowingsPageContent users={users}/>
        </FollowersFollowingCover>
    )
}

export default withRouter(Followers);