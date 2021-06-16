import { useHistory, withRouter } from "react-router";
import s from "./style.module.css"
import CommentLine from "./commentLine"
import ClearPosts from "../posts/clear";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Script from "../posts/script"
import Comment from "./comments"
import { MdKeyboardBackspace } from "react-icons/md";
import Style from "../posts/style.module.css"
import { Link } from "react-router-dom";
import S2 from "./Script.js"
function Comments(props) {
    const { id } = props.location.state || props.match.params,
        [post, setPost] = useState(false), { notify, socket } = props,
        history = useHistory(),
        userId = JSON.parse(localStorage.getItem("userInfo")).id,
        [comments, setComments] = useState(false);
    socket.on("CommentAdd", (updatedComment) => setComments(updatedComment));
    socket.on("refreshPost", (e) => setPost({ posts: [e] }));
    useEffect(() => {
        Script.getSelectedPost(id || 1)
            .then((response) => setPost(response))
            .catch((error) => console.log(error))
        S2.getAllComments(id,notify)
            .then((response) => setComments(response.data.posts))
            .catch((error) => console.log(error))
    }, [id])
    return (
        <div className={s.Container}>
            <div className={"basicPageHead" + " " + Style.Pheader}>
                <MdKeyboardBackspace className={Style.Icon} onClick={() => history.push("/posts")} />
                <div><Link to={{ pathname: "/posts" }}>Posts</Link></div>
            </div>
            {post ? <ClearPosts notify={notify} socket={socket} id={userId} toMake={post} /> : <Skeleton height={"60px"} />}
            <div className={"Separator"} onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}></div>
            {comments ? <Comment toMake={comments} /> : <Skeleton height={"50px"} count={5} />}
            {post && <CommentLine id={id} notify={notify} socket={socket} comCount={post.posts[0].comCount} />}
        </div>
    )
}

export default withRouter(Comments);