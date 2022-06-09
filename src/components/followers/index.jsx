import { withRouter } from "react-router-dom";
import ClearFollowings from "./clearFollowings";
import s from "./followers.module.css"

function Followers(props) {
    const users = props.location.state.users
    return (
        <div className={s.Container}>
            <ClearFollowings users={users}/>
        </div>
    )
}

export default withRouter(Followers);