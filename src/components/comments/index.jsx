import { withRouter } from "react-router";
import s from "./style.module.css"
import Loader from "../common/spinner/index"
import { useContext, useEffect, useState } from "react";
import Context from "../../helpers/contextHelper"
import Script from "../posts/script"
import S2 from "./Script.js"
import ClearComment from "./clearComment";
function Comments(props) {
    const { id } = props.location.state || props.match.params, [post, setPost] = useState(false),
        userId = JSON.parse(localStorage.getItem("userInfo")).id, [comments, setComments] = useState(false);
    const { socket, notify } = useContext(Context)
    socket.on("CommentAdd", (updatedComment) => setComments(updatedComment));
    socket.on("refreshPost", (e) => setPost({ posts: [e] }));
    useEffect(() => {
        Script.getSelectedPost(id || 1, notify).then((response) => setPost(response))
        S2.getAllComments(id, notify).then((response) => setComments(response.data.posts))
    }, [id])
    return (
        <div className={s.Container}>
            {(post && comments) ?
                <ClearComment post={post} userId={userId} comments={comments} notify={notify} socket={socket} id={id} /> :
                <Loader />}
        </div>
    )
}

export default withRouter(Comments);