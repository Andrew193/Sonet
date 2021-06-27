import withPageHeader from "../../hoc/withPageHeader"
import Comment from "./comments"
import Skeleton from "react-loading-skeleton";
import CommentLine from "./commentLine"
import ClearPosts from "../posts/clear";
import Context from "../../helpers/contextHelper"
import { useContext } from "react";
function ClearComment(props) {
    const { socket, notify } = useContext(Context)
    const { post, comments, userId, id } = props;
    return (
        <>
            {post ? <ClearPosts notify={notify} socket={socket} id={userId} toMake={post} /> : <Skeleton height={"60px"} />}
            <div className={"Separator"} onClick={(e) => e.target.nextElementSibling.classList.toggle("Hide")}></div>
            {comments ? <Comment toMake={comments} /> : <Skeleton height={"50px"} count={5} />}
            {post && <CommentLine id={id} notify={notify} socket={socket} comCount={post.posts[0].comCount} />}
        </>
    )
}

export default withPageHeader(ClearComment, { path: "/posts", Title: "Posts" });