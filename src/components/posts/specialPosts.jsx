import { useEffect, useState } from "react";
import ClearPost from "./clear.jsx"
import Skeleton from 'react-loading-skeleton';
import s from "./style.module.css"
import { MdKeyboardBackspace } from "react-icons/md";
import SortLine from "./SortLine.jsx";
import { Link, useHistory, withRouter } from "react-router-dom";
import Script from "./script"
function SpecialPosts(props) {
    const id = props.location.state.id
    const { type } = props.match.params;
    const { socket, notify } = props;
    const history = useHistory();
    const [posts, setPosts] = useState(false)
    socket.on(type==="notMy"?"notMyPostUpdate":"MyPostUpdate", (updatedPosts) => setPosts({ posts: updatedPosts }))
    useEffect(() => Script.getMyPostWithEndpoint(id, setPosts, type==="notMy"?"notMy":"my"), [id])
    return (
        <div className={s.Container} id={s.HF}>
            {posts ? <>
                <div className={"basicPageHead" + " " + s.Pheader} >
                    <MdKeyboardBackspace className={s.Icon} onClick={() => history.push("/posts")} />
                    <div><Link to={{ pathname: "/posts" }}>Posts</Link></div>
                </div>
                <div className={"Separator"}></div>
                <ClearPost id={id} socket={socket} notify={notify} toMake={posts} />
                <SortLine /></> :
                <Skeleton height={"50px"} count={5} />}
        </div>
    )
}
export default withRouter(SpecialPosts);