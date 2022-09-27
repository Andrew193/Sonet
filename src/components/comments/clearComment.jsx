import withPageHeader from "../../hoc/withPageHeader"
import Comment from "./comments"
import Skeleton from "react-loading-skeleton";
import CommentLine from "./commentLine"
import ClearPosts from "../../posts/PostsInnerContent";
import {useContext} from "react";
import s from "./comments.module.css";
import {Context} from "../../App";

function ClearComment(props) {
    const {
        post,
        comments,
        userId,
        id,
        settings,
        commentId
    } = props;

    const {socket, notify} = useContext(Context)

    return (
        <>
            {
                post
                    ? <ClearPosts
                        ignoreAppOpen
                        notify={notify}
                        socket={socket}
                        id={userId}
                        toMake={{...post, customClass: s.OnePost}}
                    />
                    : <Skeleton height={"60px"}/>
            }
            <div
                className={"Separator"}
                onClick={(e) => {
                    e.target.nextElementSibling.classList.toggle("Hide")
                }}
            />
            {
                comments
                    ? <Comment toMake={comments} commentId={commentId}/>
                    : <Skeleton height={"50px"} count={5}/>
            }
            {
                post && <CommentLine
                    settings={settings}
                    id={id}
                    notify={notify}
                    socket={socket}
                    comCount={post.posts[0].comCount}
                />
            }
        </>
    )
}

export default withPageHeader(ClearComment, {path: "/posts", Title: "Posts"});