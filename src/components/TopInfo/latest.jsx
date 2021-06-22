import { useEffect, useState } from "react";
import s from "./style.module.css"
import Script from "./script.js"
import Skeleton from 'react-loading-skeleton';
import PostCreator from "./creators/post";
function LatestPosts(props) {
    const [state, setState] = useState(false);
    props.socket.on("postCreate", (updatedPosts) => setState({ posts: updatedPosts }))
    useEffect(() => Script.getPosts().then((newState) => setState(newState)), [])
    return (
        <div className={!state ? s.Tip + " " + s.Center : s.Tip}>
            <h2>Latest Posts</h2>
            {state ?
                <>
                    <PostCreator toCreate={state.posts} />
                    <div className={s.LastTipItem}>Show More</div>
                </> : <Skeleton height={"50px"} count={5} />}
        </div>
    )
}
export default LatestPosts;