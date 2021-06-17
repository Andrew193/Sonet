import { withRouter } from "react-router-dom";
import FollowersCreator from "./creator";
import s from "./style.module.css"


function Followers(props) {
    const users = props.location.state.users
    return (
        <div className={s.Container}>
            <FollowersCreator toMake={users} />
        </div>
    )
}

export default withRouter(Followers);