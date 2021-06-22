import withPageHeader from "../../hoc/withPageHeader";
import FollowersCreator from "./creator";


function Clear(props) {
    const { users } = props
    return (<><FollowersCreator toMake={users} /></>)
}

export default withPageHeader(Clear, { path: "/", Title: "Followings" })