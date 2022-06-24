import {useContext, useEffect, useState} from "react";
import ClearPosts from "./PostsInnerContent";
import postsHelper from "./script.js"
import Skeleton from 'react-loading-skeleton';
import SortLine from "./SortLine.jsx"
import s from "./posts.module.css"
import {Link, withRouter} from "react-router-dom";
import PageHeader from "../components/common/navigationLine/NavigationLine.jsx";
import Context from "../helpers/contextHelper";
import {getSettings} from "../db";
import {alpha} from "@mui/material";

function PostsContainer(props) {
    const [posts, setPosts] = useState(false);
    const [settings, setSettings] = useState({});

    const {socket, notify} = useContext(Context);

    const {id} = JSON.parse(localStorage.getItem("userInfo"));

    socket.on("postUpdate", (updatedPosts) => setPosts({posts: updatedPosts}));

    useEffect(() => {
        const id = props.match.params.id;

        if (id && typeof (+id) === "number") {
            postsHelper.getSelectedPost(+id)
                .then((postF) => setPosts(postF))
                .catch((error) => {
                    error && notify(error?.response?.data?.posts)
                })
        } else {
            postsHelper.getPosts()
                .then((postF) => setPosts(postF))
                .catch((error) => {
                    error && notify(error?.response?.data?.error)
                })
        }
    }, [notify, props.match.params.id]);

    useEffect(() => {
        async function getData() {
            const response = await getSettings();

            setSettings(response[0])
        }

        getData();
    }, [])

    return (
        <div className={s.Container}>
            <style>
                {`
                     .itemsPostsPage {
                     background: ${settings?.configs?.background[settings?.background]};
                     border-left: 1px solid ${settings?.configs?.color[settings?.color]};
                     border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                     cursor: pointer;
                     }
                     .itemsPostsPage:nth-child(2n) {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.3)} !important;
                     }
                     .itemsPostsPage:hover {
                     background-color: ${alpha(settings?.configs?.color[settings?.color] || "rgb(231 231 240)", 0.5)} !important;
                     }
                     .basicPageHead {
                      background: ${settings?.configs?.background[settings?.background]};
                      border-left: 1px solid ${settings?.configs?.color[settings?.color]};
                      border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                     }
                     .rowPostsContainer {
                     height:inherit;
                     border-left: 1px solid ${settings?.configs?.color[settings?.color]};
                     border-right: 1px solid ${settings?.configs?.color[settings?.color]};
                     }
                     .authorName {
                     color: ${settings?.configs?.color[settings?.color]} !important;
                     font-weight: bold;
                     }
                `}
            </style>
            <PageHeader historyPath={"/"}>
                <Link to={{pathname: "/posts"}}>Posts</Link>
            </PageHeader>
            <div
                className={"Separator"}
                onClick={(e) => {
                    e.target.nextElementSibling.classList.toggle("Hide")
                }}
            />
            {posts
                ? <>
                    <ClearPosts id={id} toMake={posts}/>
                    <SortLine/>
                </>
                : <Skeleton height={"60px"} count={10}/>}
        </div>
    )
}

export default withRouter(PostsContainer);