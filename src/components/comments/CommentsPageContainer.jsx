import {withRouter} from "react-router";
import s from "./comments.module.css"
import Loader from "../common/spinner/Spinner"
import {useContext, useEffect, useState} from "react";
import Context from "../../helpers/contextHelper"
import Script from "../../posts/script"
import S2 from "./Script.js"
import ClearComment from "./clearComment";
import {getSettings} from "../../db";
import {alpha} from "@mui/material";

function Comments(props) {
    const {
        id
    } = props.location.state || props.match.params;

    const [post, setPost] = useState(false);
    const [comments, setComments] = useState(false);
    const [settings, setSettings] = useState({});

    const userId = JSON.parse(localStorage.getItem("userInfo")).id;

    const {socket, notify} = useContext(Context)

    socket.on("CommentAdd", (updatedComment) => setComments(updatedComment));
    socket.on("refreshPost", (e) => setPost({posts: [e]}));

    useEffect(() => {
        Script.getSelectedPost(id || 1, notify)
            .then((response) => setPost(response))
        S2.getAllComments(id, notify)
            .then((response) => setComments(response?.data?.posts))
    }, [id, notify])

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <div className={s.Container + " commentsPage"}>
            <style>
                {`
                     .commentsPage {
                     border-left: 1px solid ${settings?.configs?.color[settings?.color]};
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
                     .rowPostsContainer {
                     height:inherit;
                     }
                     .authorName {
                     color: ${settings?.configs?.color[settings?.color]} !important;
                     font-weight: bold;
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
                        id={id}
                    />
                    : <Loader/>
            }
        </div>
    )
}

export default withRouter(Comments);