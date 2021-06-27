import { useContext, useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import s from "./style.module.css"
import { withRouter } from "react-router-dom";
import Script from "./script"
import ClearSpecialPost from "./clearSpecialPost.jsx";
import Context from "../../helpers/contextHelper"
function SpecialPosts(props) {
    const id = props.location.state.id
    const { type } = props.match.params;
    const { socket } = useContext(Context)
    const [posts, setPosts] = useState(false)
    socket.on(type === "notMy" ? "notMyPostUpdate" : "MyPostUpdate", (updatedPosts) => setPosts({ posts: updatedPosts }))
    useEffect(() => Script.getMyPostWithEndpoint(id, setPosts, type === "notMy" ? "notMy" : "my"), [id])
    return (
        <div className={s.Container} id={s.HF}>
            {posts ? <ClearSpecialPost id={id} posts={posts} /> : <Skeleton height={"50px"} count={5} />}
        </div>
    )
}
export default withRouter(SpecialPosts)