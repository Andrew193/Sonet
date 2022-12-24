import React from "react";
import Comment from "./comments"
import Skeleton from "react-loading-skeleton";
import CommentLine from "./commentLine"
import ClearPosts from "../../posts/PostsInnerContent";
import {useContext} from "react";
import CommentsStyles from "./comments.module.css";
import {Context} from "../../App";
import PropTypes from "prop-types";
import Separator from "../common/Separator/Separator";

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
                        toMake={{...post, customClass: CommentsStyles.OnePost}}
                    />
                    : <Skeleton height={"60px"}/>
            }
            <Separator/>
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
            <Separator/>
        </>
    )
}

ClearComment.propTypes = {
    post: PropTypes.object,
    comments: PropTypes.array,
    userId: PropTypes.number,
    id: PropTypes.number,
    settings: PropTypes.object,
    commentId: PropTypes.number
};

export default ClearComment;