import {withRouter} from "react-router";
import s from "./comments.module.css"
import Loader from "../common/spinner/Spinner"
import {useContext, useEffect, useState} from "react";
import Script from "../../posts/postsHelper"
import S2 from "./Script.js"
import ClearComment from "./clearComment";
import {Context} from "../../App";
import {useSettings} from "../../hooks";

function Comments(props) {
    const {
        id,
        commentId
    } = props.location.state || props.match.params;

    const [post, setPost] = useState(false);
    const [comments, setComments] = useState(false);
    const {settings} = useSettings();
    const userId = JSON.parse(localStorage.getItem("userInfo")).id;

    const {socket, notify} = useContext(Context);

    socket.on("CommentAdd", (updatedComment) => setComments(updatedComment));
    socket.on("refreshPost", (e) => setPost({posts: [e]}));

    useEffect(() => {
        Script.getSelectedPost(id || 1, notify)
            .then((response) => setPost(response))
        S2.getAllComments(id, notify)
            .then((response) => setComments(response?.data?.posts))
    }, [id, notify])

    return (
        <div className={s.Container + " commentsPage"}>
            <style>
                {`
                     .commentsPage {
                     border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                     }
                     .commentsPage .onePostContainer {
                     overflow: unset;
                     }          
                     .itemsPostsPage {
                     background: ${settings?.configs?.background[settings?.background]};
                     cursor: pointer;
                     }
                     .basicPageHead {
                      background: ${settings?.configs?.background[settings?.background]};
                     }
                     .${s.Comments}{
                     background: ${settings?.configs?.background[settings?.background]};
                     }
                     .rowPostsContainer {
                     height:inherit;
                     }
                     .authorName {
                     color: ${settings?.configs?.color[settings?.color]} !important;
                     font-weight: bold;
                     }
                     .react-emoji-picker {
                     top: 0px!important;
                     width: 100%!important;
                     }
                `}
            </style>
            {
                (post && comments)
                    ? <ClearComment
                        settings={settings}
                        post={post}
                        userId={userId}
                        comments={comments}
                        notify={notify}
                        socket={socket}
                        commentId={commentId}
                        id={id}
                    />
                    : <Loader/>
            }
        </div>
    )
}

export default withRouter(Comments);